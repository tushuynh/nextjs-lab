'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  TextField,
  Button,
  CircularProgress,
  Typography,
  Paper,
} from '@mui/material';
import useDebounce from 'hooks/useDebounce';
import getProductInfo from '@/actions/getProductInfo';

const schema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  description: z.string().min(1, 'Description is required'),
  tags: z.string().min(1, 'Tags are required'),
});

type FormData = z.infer<typeof schema>;

const ProductForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isLoading, setIsLoading] = useState(false);
  const productId = watch('productId');
  const debouncedProductId = useDebounce(productId, 500);
  const [productInfo, setProductInfo] = useState<{ name: string } | null>(null);

  const fetchProductInfo = async (id: string) => {
    if (id) {
      setIsLoading(true);

      const data = await getProductInfo(id);
      if (!data) {
        setError('productId', {
          type: 'manual',
          message: 'Product Id not found',
        });
        setProductInfo(null);
      } else {
        setProductInfo(data);
      }

      setIsLoading(false);
    } else {
      setProductInfo(null);
    }
  };

  useEffect(() => {
    if (debouncedProductId) {
      fetchProductInfo(debouncedProductId);
    } else {
      setProductInfo(null);
    }
  }, [debouncedProductId]);

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper className="p-8 w-full max-w-md shadow-lg">
        <Typography
          variant="h5"
          align="center"
          gutterBottom
        >
          Product Form
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="grid grid-cols-3 gap-4 items-center">
            <label
              htmlFor="productId"
              className="text-right"
            >
              Product ID:
            </label>
            <div className="col-span-2">
              <Controller
                name="productId"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="productId"
                    fullWidth
                    error={!!errors.productId}
                    helperText={errors.productId?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <label
              htmlFor="description"
              className="text-right"
            >
              Description:
            </label>
            <div className="col-span-2">
              <Controller
                name="description"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="description"
                    fullWidth
                    error={!!errors.description}
                    helperText={errors.description?.message}
                  />
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 items-center">
            <label
              htmlFor="tags"
              className="text-right"
            >
              Tags:
            </label>
            <div className="col-span-2">
              <Controller
                name="tags"
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    id="tags"
                    fullWidth
                    error={!!errors.tags}
                    helperText={errors.tags?.message}
                  />
                )}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="flex items-center space-x-2">
              <CircularProgress size={20} />
              <Typography>Loading product info...</Typography>
            </div>
          ) : (
            productInfo && (
              <Typography
                variant="body1"
                className="text-center"
              >
                Product Name: <strong>{productInfo.name}</strong>
              </Typography>
            )
          )}

          <div className="flex justify-center mt-6">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full"
            >
              Submit
            </Button>
          </div>
        </form>
      </Paper>
    </div>
  );
};

export default ProductForm;

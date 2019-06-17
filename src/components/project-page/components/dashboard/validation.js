import { object, array, string } from 'yup';

export const LinkSchema = () => object().shape({ links: array().of(
  object().shape({ name: string()
    .max(20, 'Name is too long')
    .required('Name is required'),
  url: string()
    .url('Must be a URL')
    .required('URL is required') }),
) });

export const DescriptionSchema = () => object().shape({ name: string()
  .min(2, 'Too Short!')
  .max(50, 'Too Long!')
  .required('Required'),
description: string().required('Required') });

'use client';
import { useForm, SubmitHandler } from 'react-hook-form';

interface Inputs {
  title: string;
  date: Date;
  subtitle: string;
  content: string;
}

const BlogWriter = () => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch('http://localhost:3000/api/writePost', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json',
        },
      });
      console.log(res);
      if (res.ok) {
        console.log('Yeai!');
      } else {
        console.log('Oops! Something is wrong.');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Post title</label>
        <input {...register('title', { required: true })} />
        <label>Post date</label>
        <input
          type='date'
          defaultValue={new Date().toISOString().split('T')[0]}
          {...register('date', { required: true })}
        />
        <label>Post subtitle</label>
        <input {...register('subtitle', { required: false })} />
        <label>Post content</label>
        <textarea
          style={{ height: '400px', width: '400px' }}
          {...register('content', { required: true })}
        />
        {errors.title && errors.content && <span>This field is required</span>}

        <input type='submit' />
      </form>
    </>
  );
};
export default BlogWriter;

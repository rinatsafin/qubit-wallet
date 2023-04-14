import { Button, ButtonProps } from '@/shared';
import { useRouter } from 'next/navigation';
import { type FC } from 'react';

interface LoadMoreNewsProps extends ButtonProps {
  nextNewsPage: string | null;
}

const LoadMoreNews: FC<LoadMoreNewsProps> = ({ nextNewsPage, ...otherProps }) => {
  const router = useRouter();

  return (
    <div className='load-more'>
      <Button
        className='btn btn-primary'
        onClick={() => {
          console.log(nextNewsPage);
          router.push(`/news/${nextNewsPage}`);
        }}
        isDisabled={!nextNewsPage}
        {...otherProps}
      >
        Load More
      </Button>
    </div>
  );
};

export default LoadMoreNews;

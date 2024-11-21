import { useRouter } from 'next/router';

const router = useRouter();

// Inside your handleSubmit function
if (accountType === 'customer') {
  router.push('/ordernow');
} else if (accountType === 'manager') {
  router.push('/manager');
}
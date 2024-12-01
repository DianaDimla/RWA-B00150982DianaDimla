import { useRouter } from 'next/router'; // Import Next.js router

const router = useRouter(); // Initialize router

// Inside your handleSubmit function
if (accountType === 'customer') { // If user is a customer
  router.push('/ordernow'); // Redirect to customer order page
} else if (accountType === 'manager') { // If user is a manager
  router.push('/manager'); // Redirect to manager dashboard
}

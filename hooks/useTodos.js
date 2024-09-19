// hooks/useTodos.js
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchTodos = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');
  return data;
};

const useTodos = () => {
  return useQuery({
    queryKey: ['todos'], // Previously: useQuery(['todos'], fetchTodos)
    queryFn: fetchTodos,
  });
};

export default useTodos;

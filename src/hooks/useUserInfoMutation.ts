import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUserInfo as updateUserInfoApi, UserInfoPayload } from '../services/api';
import { useAppDispatch } from '../store';
import { updateUserInfo as updateUserInfoAction } from '../store/slices/authSlice';
import { showError } from '../utils/alert';

/**
 * Hook for updating user information (fitness goals, health stats, etc.)
 * Uses React Query for state management and syncs result to Redux.
 */
export const useUserInfoMutation = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UserInfoPayload) => updateUserInfoApi(payload),
    onSuccess: (data, variables) => {
      // 1. Update Redux store with the new info
      // Note: We use variables here if the API doesn't return the full updated user object
      dispatch(updateUserInfoAction(variables));
      
      // 2. Invalidate relevant queries to trigger refetch (e.g., user profile)
      queryClient.invalidateQueries({ queryKey: ['userProfile'] });
      
      console.log('✅ User info updated successfully');
    },
    onError: (error: any) => {
      console.error('❌ User info update failed:', error);
      showError('Failed to save your progress. Please try again.');
    },
  });
};

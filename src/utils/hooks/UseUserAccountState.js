import { useState, useEffect } from 'react';
import { fetchUserAccount } from '../networking/API';

export default function useUserAccountState(userId) {
  const [userAccount, setUserAccount] = useState(null);
  const [isFetchingUserAccount, setIsFetchingUserAccount] = useState(false);
  const [hasUserAccountFetchError, setHasUserAccountFetchError] = useState(false);

  useEffect(() => {
    async function loadAccountDetails() {
      setIsFetchingUserAccount(true);

      console.log('<><><><><> FETCHING <><><><><><>');
      console.log(`<><><><><> ${userId} <><><><><><>`);
      try {
        // TODO: Refactor after there's more clarity about how to retrieve authentication
        // credentials from the API.
        const response = await fetchUserAccount(userId);
        const userAccount = response.data;
        console.log('FETCHED A USER?', response);

        setUserAccount(userAccount);
        setHasUserAccountFetchError(false);
      } catch (error) {
        setHasUserAccountFetchError(true);
      } finally {
        setIsFetchingUserAccount(false);
      }
    }

    loadAccountDetails();
  }, [userId]);

  return {
    userAccount,
    isFetchingUserAccount,
    hasUserAccountFetchError,
  };
}

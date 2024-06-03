import create from 'zustand';

const BACK_URL = 'http://localhost:3000';

const useStore = create((set) => ({
  isLoading: false,
  setLoading: (loading) => set({ isLoading: loading }),

  isLoadingProfile: false,
  latestEvents: [],
  user: null,
  newuser: null,
  token: localStorage.getItem('token') || null,
  isAuthenticated: false,
  profile: null,
  role: null,
  membershipStatus: null,

  // Set user data and authentication token
  setUser: (userData, authToken) =>
    set((state) => ({
      user: userData,
      token: authToken,
      isAuthenticated: true,
    })),

  // Clear user data and authentication token on logout
  logout: () =>
    set((state) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      role: null,
    })),

  // Sign up new user
  signup: async (userData) => {
    try {
      const response = await fetch(`${BACK_URL}/users/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error in signup:', error);
      throw error;
    }
  },

  // Sign in user and update user data, token, and role
  signin: async (emailOrPhone, password) => {
    try {
      const response = await fetch(`${BACK_URL}/users/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrPhone, password }),
      });

      if (!response.ok) {
        throw new Error('Signin failed');
      }

      const data = await response.json();

      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        set((state) => ({
          user: data.user,
          newuser: data.user,
          token: data.token,
          isAuthenticated: true,
          role: data.role || null,
        }));
        console.log('User data received after signin:', data.user);

        // Call checkMembershipStatus after successful signin
        await useStore.getState().checkMembershipStatus();
      }

      return data;
    } catch (error) {
      console.error('Error in signin:', error);
      throw error;
    }
  },

  // Fetch latest events
  fetchLatestEvents: async () => {
    set({ isLoading: true });

    try {
      const response = await fetch(`${BACK_URL}/event/new`);
      if (!response.ok) {
        throw new Error('Failed to fetch latest events');
      }
      const data = await response.json();
      set({ latestEvents: data.latestEvents });
    } catch (error) {
      console.error('Error fetching latest events:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  applyForMembership: async (membershipData) => {
    try {
      const response = await fetch(`${BACK_URL}/membership/apply`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useStore.getState().token}`,
        },
        body: JSON.stringify(membershipData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to apply for membership');
      }
      
      const data = await response.json();
      await useStore.getState().checkMembershipStatus();
      return data.status; // Return the updated membership status
    } catch (error) {
      console.error('Error applying for membership:', error);
      throw error;
    }
  },

  // Fetch user profile
  fetchUserProfile: async () => {
    set({ isLoadingProfile: true });

    try {
      const token = localStorage.getItem('token');

      const response = await fetch(`${BACK_URL}/users/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }

      const data1 = await response.json();
      set({ profile: data1, isLoadingProfile: false });
      console.log('User profile fetched:', data1);

      return data1;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      set({ isLoadingProfile: false });
      throw error;
    }
  },

  // Check membership status
  checkMembershipStatus: async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        throw new Error('No token found');
      }

      const response = await fetch(`${BACK_URL}/users/checkmembership`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 404) {
        console.warn('Membership status not found for this user.');
        set({ membershipStatus: 'none' });
        return 'none';
      }

      if (!response.ok) {
        throw new Error('Failed to fetch membership status');
      }

      const data = await response.json();
      console.log('Membership status data:', data);

      set({ membershipStatus: data.status });

      return data.status;
    } catch (error) {
      console.error('Error fetching membership status:', error);
      throw error;
    }
  },

  // Initialize the store on app start
  initializeStore: async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await fetch(`${BACK_URL}/users/getauth`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to authenticate user');
        }

        const data = await response.json();
        console.log(data);
        if (data.message === 'ok') {
          set({
            isAuthenticated: true,
            token,
            role: data.role || null,
          });
        } else {
          throw new Error('User not authenticated');
        }

        await useStore.getState().checkMembershipStatus();
      } catch (error) {
        console.error('Error initializing store:', error);
        localStorage.removeItem('token');
        set({
          isAuthenticated: false,
          role: null,
        });
      }
    } else {
      set({
        isAuthenticated: false,
        role: null,
      });
    }
  },

  // Update user profile
  updateUserProfile: async (updateFields) => {
    try {
      const response = await fetch(`${BACK_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useStore.getState().token}`,
        },
        body: JSON.stringify(updateFields),
      });

      if (!response.ok) {
        throw new Error('Failed to update user profile');
      }

      const data = await response.json();
      set({ profile: data.user });
      return data;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  // Update member profile
  updateMemberProfile: async (updates) => {
    try {
      const response = await fetch(`${BACK_URL}/users/member`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useStore.getState().token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update member profile');
      }

      const data = await response.json();
      set((state) => ({
        profile: { ...state.profile, member: data.member },
      }));
      return data;
    } catch (error) {
      console.error('Error updating member profile:', error);
      throw error;
    }
  },

  // Update household profile
  updateHouseholdProfile: async (updates) => {
    try {
      const response = await fetch(`${BACK_URL}/users/household`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${useStore.getState().token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        throw new Error('Failed to update household profile');
      }

      const data = await response.json();
      set((state) => ({
        profile: { ...state.profile, household: data.household },
      }));
      return data;
    } catch (error) {
      console.error('Error updating household profile:', error);
      throw error;
    }
  },
}));

// Initialize the store on app start
useStore.getState().initializeStore();

export default useStore;





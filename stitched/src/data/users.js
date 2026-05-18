export const users = [
  {
    id: 'user-1',
    username: 'gopal',
    name: 'Gopal (Admin)',
    avatar: 'https://i.pravatar.cc/150?u=gopal',
    role: 'admin',
    location: 'NIFT Delhi Campus',
    bio: 'Campus Moderator & Textile Design 4th Year. Running the zero-waste club.',
    memberSince: '2023-08-15',
    stats: {
      listings: 45,
      credits: 2400,
      wasteSaved: 12.5,
      co2Offset: 45,
      waterSaved: 1200
    }
  },
  {
    id: 'user-2',
    username: 'vaishnavi',
    name: 'Vaishnavi',
    avatar: 'https://i.pravatar.cc/150?u=vaishnavi',
    role: 'user',
    location: 'Fashion Design 3rd Year',
    bio: 'Always looking for cheap denim scraps and weird hardware for my draping assignments.',
    memberSince: '2024-01-10',
    stats: {
      listings: 12,
      credits: 350,
      wasteSaved: 3.2,
      co2Offset: 12,
      waterSaved: 300
    }
  }
];

export const getUserByUsername = (username) => users.find(u => u.username === username);

export interface IAcademySlice {
  category: {
    query: {
      keyword: string;
    };
    data: [
      {
        id: number;
        name: string;
      }
    ];
    status: {
      isLoading: boolean;
    };
  };
}

export const academyinitialState: IAcademySlice = {
  category: {
    query: {
      keyword: ''
    },
    data: [
      {
        id: 0,
        name: ''
      }
    ],
    status: {
      isLoading: false
    }
  }
};

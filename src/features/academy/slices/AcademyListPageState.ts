export interface IAcademySlice {
  category: {
    query: {
      keyword: string;
    };
    responseData: [
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
    responseData: [
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

export interface IAcademySlice {
  category: {
    query: {
      keyword: string;
    };
    responseData: {
      id: number;
      name: string;
    }[];
    status: {
      isLoading: boolean;
    };
  };
  list: {
    query: {
      keyword: string;
    };
    responseData: {
      id: number;
      name: string;
      roadAddress: string;
      commonAddress: string;
      bookingUrl: string;
      phoneNum: string;
      businessHours: string;
      imageUrl: string;
      x: string;
      y: string;
      yogaSorts: {
        name: string;
      }[];
    }[];
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
  },
  list: {
    query: {
      keyword: ''
    },
    responseData: [],
    status: {
      isLoading: false
    }
  }
};

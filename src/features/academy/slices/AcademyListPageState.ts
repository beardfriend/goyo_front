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
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      rowCount: number;
    };
    status: {
      status: 'idle' | 'loading' | 'success' | 'fail';
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
    pagination: {
      page: 0,
      pageCount: 0,
      pageSize: 0,
      rowCount: 0
    },
    status: {
      status: 'idle',
      isLoading: false
    }
  }
};

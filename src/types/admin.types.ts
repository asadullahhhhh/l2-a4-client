export type AdminRoute = {
    title: string;
    items: {
        title: string;
        url: string;
    }[]
}

export type User = {
  id: string;
  name: string;
  email: string;
  image: string | null;
  role: string;
  status: string;
  createdAt: string;
};

export type PaginationMetaData = {
  page: number;
  limit: number;
  totalItems: number;
  totalPage: number;
};


export type GetAllUsersParams = {
    page?: string,
    limit?: string,
    status?: string,
    role?: string
}

export type UserPayload = {
  status?: "ACTIVE" | "SUSPENDED";
  userId: string;
}

export type UserRequest = {
    name: string;
    username: string;
    password: string;
};

export type UserLogin = Omit<UserRequest, 'name'>;

export type UserInput = UserRequest & {
    id: string;
};
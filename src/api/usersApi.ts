import { GetItemstype, instance, ResponseType } from './api';

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
      return instance
        .get<GetItemstype>(`users?page=${currentPage}&count=${pageSize}`)
        .then((response) => response.data);
    },
    unfollowUser(id: number) {
      return instance.delete(`follow/${id}`).then((reponse) => reponse.data) as Promise<ResponseType>
    },
    followUser(id: number) {
      return instance.post<ResponseType>(`follow/${id}`).then((reponse) => reponse.data);
    },
};
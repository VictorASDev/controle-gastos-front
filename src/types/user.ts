import type Followers from "./follower";
import type Following from "./following";

export default interface User {
    username: string,
    followers: Followers[],
    following: Following[],
    posts: number[]
}
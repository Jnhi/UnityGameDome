export class Random
{
    public static random = (min:any,max:any) => Math.floor(Math.random() * (max - min + 1) + min)
}
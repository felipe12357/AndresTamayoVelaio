export type TaskDto = {
    userId?: number,
    id: number,
    title: string,
    completed: boolean,
    limitDate?:Date,
    people?:PersonDto[]

}

export type SkillDto = {
    name:string;
}

export type PersonDto ={
    name:string,
    age:number,
    skills:SkillDto[]
}

export enum TaskFilterEnum  {
    COMPLETED = 'Completed',
    PENDING = 'Pending',
    ALL = 'All'
}

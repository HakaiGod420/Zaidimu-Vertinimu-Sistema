export interface BasicCompany {
  id: number,
  }
  
  export interface Company extends BasicCompany{
    name: string,
    creationDate: Date,
    image: string
  }
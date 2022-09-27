export interface BasicCompany {
  name: string,
  creationDate: Date,
  image: string
  }
  
  export interface Company extends BasicCompany{
    id: number,
  }
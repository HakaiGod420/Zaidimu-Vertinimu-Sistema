export interface BasicCompany {
  id: number,
  }
  
  export interface Company extends BasicCompany{
    name: string,
    creationDate: Date,
    image: string
  }

  export interface CreateCompany{
    name: string,
    creationDate: string,
    image: string
  }
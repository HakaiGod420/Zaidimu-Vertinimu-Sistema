import { Axios } from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { Company } from '../types/company';
const axios: Axios = require('axios');

type Data = Company[]

export async function fetchCompanies(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const url = "http://localhost:3001"
    
    axios.get(url + '/companies').then(function (response) {
        const companies: Company[] = response.data.companies
        return res.status(response.status).json(companies);
    }).catch(function (error) {
        return res.status(error.status).json(error);
    })
}
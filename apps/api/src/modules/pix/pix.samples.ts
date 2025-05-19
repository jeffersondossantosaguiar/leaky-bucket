import { PixKey } from './pix.types.js';

export const keys: PixKey[] = [
  {
    key: '47742663023',
    keyType: 'CPF',
    account: {
      participant: '12345678',
      branch: '0001',
      accountNumber: '0007654321',
      accountType: 'CACC',
      openingDate: '2010-01-10T03:00:00Z'
    },
    owner: {
      type: 'NATURAL_PERSON',
      taxIdNumber: '47742663023',
      name: 'João Silva'
    },
    creationDate: '2019-11-18T03:00:00Z',
    keyOwnershipDate: '2019-11-18T03:00:00Z'
  },
  {
    key: '34183937000161',
    keyType: 'CNPJ',
    account: {
      participant: '87654321',
      branch: '0001',
      accountNumber: '00123456789',
      accountType: 'CACC',
      openingDate: '2015-06-15T03:00:00Z'
    },
    owner: {
      type: 'LEGAL_PERSON',
      taxIdNumber: '34183937000161',
      name: 'Empresa Exemplo Ltda'
    },
    creationDate: '2020-03-22T03:00:00Z',
    keyOwnershipDate: '2020-03-22T03:00:00Z'
  },
  {
    key: '+5511998765432',
    keyType: 'PHONE',
    account: {
      participant: '11223344',
      branch: '0001',
      accountNumber: '00987654321',
      accountType: 'CACC',
      openingDate: '2018-09-05T03:00:00Z'
    },
    owner: {
      type: 'NATURAL_PERSON',
      taxIdNumber: '12345678901',
      name: 'Maria Oliveira'
    },
    creationDate: '2021-07-10T03:00:00Z',
    keyOwnershipDate: '2021-07-10T03:00:00Z'
  },
  {
    key: 'maria.oliveira@email.com',
    keyType: 'EMAIL',
    account: {
      participant: '22334455',
      branch: '0001',
      accountNumber: '00112233445',
      accountType: 'CACC',
      openingDate: '2017-04-20T03:00:00Z'
    },
    owner: {
      type: 'NATURAL_PERSON',
      taxIdNumber: '98765432100',
      name: 'Maria Oliveira'
    },
    creationDate: '2021-05-15T03:00:00Z',
    keyOwnershipDate: '2021-05-15T03:00:00Z'
  },
  {
    key: '8363ff58-2856-4tc6-9ae7-4b048b92a475',
    keyType: 'EVP',
    account: {
      participant: '33445566',
      branch: '0001',
      accountNumber: '00556677889',
      accountType: 'CACC',
      openingDate: '2016-11-30T03:00:00Z'
    },
    owner: {
      type: 'NATURAL_PERSON',
      taxIdNumber: '11223344556',
      name: 'Carlos Pereira'
    },
    creationDate: '2022-02-10T03:00:00Z',
    keyOwnershipDate: '2022-02-10T03:00:00Z'
  }
];
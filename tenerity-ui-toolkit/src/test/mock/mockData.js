import * as appConfigReducer from '../../../../container-ui-app/src/app/redux/reducers/appConfig'

const defaultClient = 'demo'
const defaultENV = 'dev'

export const testAlertData = {
  summary: {
    low: 10,
    medium: 0,
    high: 10,
  },
  totalRiskScore: 600,
  totalRiskSeverity: 'HIGH',
  totalAssetCount: 3,
  activeAlerts: [
    {
      alertId: 'ac06cd49-5c5f-461b-8acb-6ff29277d083',
      severity: 'HIGH',
      source: 'deep web',
      description: 'On 04/18/2021 , we discovered this identity information including your passports that we believe belongs to you from pastebin.com/Eq4NN5Gh.',
      locale: 'en',
      linkedObjectType: 'asset',
      linkedEntityDetails: {
        assetId: '4ffc3c9c-843d-499b-93eb-01a32f9e137e',
        assetType: 'company',
        category: 'company',
        company: 'Tenerity',
        details: '10 Downing street London United Kingdom',
        addressLine1: 'address line1',
        addressLine2: 'address line2',
        addressLine3: 'address line3',
        city: 'city',
        country: 'country',
        postalCode: '412307',
      },
      createdDate: '2022-03-14T14:36:26.079Z',
      attributes: {},
    },
    {
      alertId: 'ac06cd49-5c5f-461b-8acb-6ff29277d084',
      severity: 'LOW',
      source: 'deep web',
      description: 'On 04/18/2021 , we discovered this identity information including your passports that we believe belongs to you from pastebin.com/Eq4NN5Gh.',
      linkedObjectType: 'asset',
      locale: 'en',
      linkedEntityDetails: {
        assetId: '4ffc3c9c-843d-499b-93eb-01a32f9e137e',
        assetType: 'credit_card',
        category: 'finance',
        company: 'Tenerity',
        details: '****1234',
      },
      createdDate: '2022-03-14T14:36:26.079Z',
      attributes: {},
    },
    {
      alertId: 'ac06cd49-5c5f-461b-8acb-6ff29277d085',
      severity: 'MEDIUM',
      source: 'deep web',
      description: 'On 04/18/2021 , we discovered this identity information including your passports that we believe belongs to you from pastebin.com/Eq4NN5Gh.',
      linkedObjectType: 'asset',
      locale: 'en',
      linkedEntityDetails: {
        assetId: '4ffc3c9c-843d-499b-93eb-01a32f9e137e',
        assetType: 'credit_card',
        category: 'finance',
        company: 'Tenerity',
        details: '****1234',
      },
      createdDate: '2022-03-14T14:36:26.079Z',
      attributes: {},
    },
  ],
  resolvedAlerts: [
    {
      alertId: 'ac06cd49-5c5f-461b-8acb-6ff29277d093',
      severity: 'LOW',
      source: 'deep web',
      description: 'On 04/18/2021 , we discovered this identity information including your passports that we believe belongs to you from pastebin.com/Eq4NN5Gh.',
      linkedObjectType: 'asset',
      locale: 'en',
      linkedEntityDetails: {
        assetId: '4ffc3c9c-843d-499b-93eb-01a32f9e137e',
        assetType: 'credit_card',
        category: 'finance',
        company: 'Tenerity',
        details: '****1234',
      },
      createdDate: '2022-03-14T14:36:26.079Z',
      attributes: {},
    },
  ],
}

export const testTimelineData = {
  data: {
    matched_results: 12,
    activities: [
      {
        id: '0a446ecb-d2e0-45f7-9b72-e8e8548a5825',
        eventType: 'EMPLOYEE_INVITED',
        attributes: {
          firstName: 'test',
          lastName: 'test',
        },
        createdOn: '2022-07-26 04:57:53',
      },
      {
        id: '0a446ecb-d2e0-45f7-9b72-e8e8548a5826',
        eventType: 'EMPLOYEE_DELETED',
        attributes: {
          firstName: 'test',
          lastName: 'test',
        },
        createdOn: '2022-07-26 04:57:53',
      },
      {
        id: '0a446ecb-d2e0-45f7-9b72-e8e8548a5821',
        eventType: 'ALERT_RESOLVED',
        attributes: {
          assetType: 'domain',
          assetCategory: 'business',
        },
        createdOn: '2022-07-26 04:57:53',
      },
      {
        id: '9b8f2a5b-b7d9-420c-8ed0-2327c912ad94',
        eventType: 'ASSET_DELETED',
        attributes: {
          assetType: 'email',
          assetValue: 'a*d@y*****l.com',
          assetCategory: 'business',
        },
        createdOn: '2022-07-26 04:55:06',
      },
      {
        id: '4a3fb647-8e38-45a0-a147-aef63936ca29',
        eventType: 'ASSET_UPDATED',
        attributes: {
          assetType: 'email',
          assetValue: 'x*g@y*****l.com',
          assetCategory: 'business',
        },
        createdOn: '2022-07-26 04:54:53',
      },
      {
        id: 'db23cf29-1354-4770-aa74-a8eb1cb0b3af',
        eventType: 'ASSET_ADDED',
        attributes: {
          assetType: 'email',
          assetValue: 'x*g@y*****l.com',
          assetCategory: 'business',
        },
        createdOn: '2022-07-26 04:54:50',
      },
      {
        id: '8cfdd966-5d68-4f08-be61-c6d5f2c79201',
        eventType: 'ASSET_UPDATED',
        attributes: {
          assetType: 'email',
          assetValue: 'a*d@y*****l.com',
          assetCategory: 'business',
        },
        createdOn: '2022-07-26 04:54:37',
      },
      {
        id: 'aee59116-0ced-45d7-8f8a-fc09ee944978',
        eventType: 'ASSET_ADDED',
        attributes: {
          assetType: 'email',
          assetValue: 'a*d@y*****l.com',
          assetCategory: 'business',
        },
        createdOn: '2022-07-26 04:54:34',
      },
      {
        id: 'b8b76ad7-ea82-4ac1-9412-e08cfa178262',
        eventType: 'ASSET_UPDATED',
        attributes: {
          assetType: 'domain',
          assetValue: 'yopmail.com',
          assetCategory: 'business',
        },
        createdOn: '2022-07-26 04:54:12',
      },
      {
        id: '373b1cad-2453-412c-b40f-c89a14c94e35',
        eventType: 'ASSET_ADDED',
        attributes: {
          assetType: 'domain',
          assetValue: 'yopmail.com',
          assetCategory: 'business',
        },
        createdOn: '2022-07-26 04:54:08',
      },
      {
        id: '166f8c65-aae9-4d87-a575-f1cc86a52874',
        eventType: 'ASSET_UPDATED',
        attributes: {
          assetType: 'company',
          assetValue: 'tesla/abc,abc,abc,1234',
          assetCategory: 'company',
        },
        createdOn: '2022-07-26 04:54:05',
      },
      {
        id: '4b3f4a44-83e2-48a5-a19a-248326c7a009',
        eventType: 'ASSET_ADDED',
        attributes: {
          assetType: 'company',
          assetValue: 'tesla/abc,abc,abc,1234',
          assetCategory: 'company',
        },
        createdOn: '2022-07-26 04:53:52',
      },
      {
        id: 'eb45d6a8-f8b7-4ca7-8b2d-c62d2be22d3b',
        eventType: 'ACCOUNT_ACTIVATED',
        attributes: null,
        createdOn: '2022-07-26 04:53:12',
      },
      {
        id: '6271d927-678d-4cc2-b672-f65bb2f72ef1',
        eventType: 'ACCOUNT_CREATED',
        attributes: null,
        createdOn: '2022-07-26 04:51:55',
      },
    ],
  },
  pagination: {
    offset: 0,
    limit: 10,
    total_results: 12,
  },
}

export const testManageAssetsData = {
  memberId: 'cc7162e8-6288-4eb1-8886-aa870f72fb3a',
  totalAssetCount: 28,
  maxAssetCount: 82,
  company: {
    assets: [
      {
        assetId: '2cbb2d52-0977-4c4a-a1bd-c194d9d13210',
        assetType: 'company',
        company: 'Facebook American online social network service that is part of the company Meta Platforms Facebook was founded in 2004 by Mark Zuckerberg Eduardo Saverin Dustin Moskovitz and Chris Hughes all of whom',
        details: 'Sanfrancisco california USA Z123ER',
        createdOn: '2022-05-12 05:21:46',
        addressLine1: 'Sanfrancisco',
        city: 'california',
        country: 'USA',
        postalCode: 'Z123ER',
        status: 'ACTIVE',
        attributes: {
          addressAssetId: '016b9e7d-1d7a-47f0-9aac-4085197112cb',
        },
      },
      {
        assetId: 'b0f10250-7648-4989-8552-270c8ed4526d',
        assetType: 'company',
        company: 'Test Company 2',
        details: 'Test Address 1  Test Address 2 Test Address 3 Test City Test Country Test Post Code',
        createdOn: '2022-05-10 05:28:13',
        addressLine1: 'Test Address 1 ',
        addressLine2: 'Test Address 2',
        addressLine3: 'Test Address 3',
        city: 'Test City',
        country: 'Test Country',
        postalCode: 'Test Post Code',
        status: 'ACTIVE',
        attributes: {
          addressAssetId: 'c4688dd7-7611-48cc-a97f-9b2dc0fdf410',
        },
      },
      {
        assetId: '8f1c0639-b7c3-495f-ad01-14caf224928a',
        assetType: 'company',
        company: 'Wehrendorfer Str 24',
        details: 'Wehrendorfer Str. 24 Wehrendorfer Str 24 Bohmte Wehrendorfer Str 24',
        createdOn: '2022-05-09 04:39:21',
        addressLine1: 'Wehrendorfer Str. 24',
        addressLine2: 'Wehrendorfer Str 24',
        city: 'Bohmte',
        country: 'Wehrendorfer',
        postalCode: 'Str 24',
        status: 'ACTIVE',
        attributes: {
          addressAssetId: 'a4c2056d-5dce-4e0a-ab91-1de7423d27de',
        },
      },
      {
        assetId: '8d36e7f2-75b6-427b-bfd5-6f7bc9fad76c',
        assetType: 'company',
        company: 'Test Company',
        details: 'Test Addr 1 Test Addr 2 Test Addr 3 PUNE INDIA 250012',
        createdOn: '2022-05-05 07:08:22',
        addressLine1: 'Test Addr 1',
        addressLine2: 'Test Addr 2',
        addressLine3: 'Test Addr 3',
        city: 'PUNE',
        country: 'INDIA',
        postalCode: '250012',
        status: 'ACTIVE',
        attributes: {
          addressAssetId: 'b076e90f-2f12-46e9-b00d-9def012d37ce',
        },
      },
    ],
    summary: {
      company: {
        maxCount: 10,
        actualCount: 4,
      },
    },
  },
  finance: {
    assets: [
      {
        assetId: '94882359-782c-4f3d-bd8c-d225d936e914',
        assetType: 'iban',
        company: 'Individual',
        details: '***********6666',
        createdOn: '2022-05-12 05:44:15',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '17b8e3fa-1797-4d0b-b2d3-16c5192fa154',
        assetType: 'bank_account',
        company: 'Test Company 2',
        details: '****8014',
        createdOn: '2022-05-10 05:41:14',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: 'a9438f65-93bc-4554-815d-8f8613475f2d',
        assetType: 'credit_card',
        company: 'Wehrendorfer Str 600',
        details: '************1793',
        createdOn: '2022-05-10 05:41:00',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: 'b2754481-37aa-4780-a12f-279b4ec6efa3',
        assetType: 'iban',
        company: 'dvnskdvnvldlkvmskfmvksmvklsfnvjsfnbljsfnblsfvmsfkmvks;fmvk;sfmbsfbknsfjbnjslfnbsnfvksfbdnfjlnbjdknbjdfnbjldfnbjldnjblndjlbldgbndbjdlnbjlnjbfknsfnjlsnjnjlsnjgnfsjbnjflsnbjsfnvljsfnbjssnvjsdnvjlsnvlnsvn',
        details: '************}{":',
        createdOn: '2022-05-10 05:22:15',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: 'e5204196-0398-4510-a8f8-6866b77d6ff6',
        assetType: 'iban',
        company: 'Individual',
        details: '***********6456',
        createdOn: '2022-05-06 05:05:31',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '9f12c9ba-9ece-4535-8c2f-30a08d751522',
        assetType: 'iban',
        company: 'Individual',
        details: '***********5345',
        createdOn: '2022-05-06 05:05:12',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '84f6cdf0-4dfb-4a15-8d56-06130e60333f',
        assetType: 'iban',
        company: 'Individual',
        details: '***********8788',
        createdOn: '2022-05-06 05:03:30',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: 'a1525bdf-2c20-4be5-b417-8256dfe5ec9c',
        assetType: 'iban',
        company: 'Test Company',
        details: '************5677',
        createdOn: '2022-05-05 09:27:05',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '8ee9de09-b32c-44a7-9cab-17d0832130a6',
        assetType: 'bank_account',
        company: 'Wehrendorfer Str. 22',
        details: '****6134',
        createdOn: '2022-05-05 09:26:39',
        status: 'ACTIVE',
        attributes: {},
      },
    ],
    summary: {
      credit_card: {
        maxCount: 10,
        actualCount: 1,
      },
      iban: {
        maxCount: 10,
        actualCount: 6,
      },
      bank_account: {
        maxCount: 10,
        actualCount: 2,
      },
    },
  },
  business: {
    assets: [
      {
        assetId: '22a61bcd-e62a-448f-9f87-0ddb242c918a',
        assetType: 'email',
        company: 'Wehrendorfer Str 600',
        details: 'a*c@x*z.com',
        createdOn: '2022-05-10 05:41:34',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '93251ab4-e5ff-40bb-9189-e822db9e841c',
        assetType: 'network_ip',
        company: 'Individual',
        details: '*******************************ffff',
        createdOn: '2022-05-09 10:30:30',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: 'b3db06b9-0a90-4632-97c6-0ca54df73e10',
        assetType: 'domain',
        company: 'Individual',
        details: '*******coin',
        createdOn: '2022-05-09 05:16:50',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '5d06ea48-433e-451f-953c-6381b9b940dc',
        assetType: 'domain',
        company: 'Individual',
        details: '*******.com',
        createdOn: '2022-05-08 04:33:19',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '42205e05-5d4e-40a2-bf5b-976aed292576',
        assetType: 'domain',
        company: 'Individual',
        details: '*****.com',
        createdOn: '2022-05-06 13:44:18',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '62bfadd2-d9ab-4aab-8dbe-d5315ceebb84',
        assetType: 'company_duns_number',
        company: 'Individual',
        details: '*****4234',
        createdOn: '2022-05-06 11:10:25',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '85348318-89a2-4d49-8ebb-9cccb445580f',
        assetType: 'network_ip',
        company: 'Individual',
        details: '*********55.0',
        createdOn: '2022-05-06 11:09:48',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '84c2b3b3-d0d6-4d08-ae53-05bfd4364ca5',
        assetType: 'domain',
        company: 'Individual',
        details: '***********.com',
        createdOn: '2022-05-06 11:08:06',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '5521089a-c42b-47bf-9ad0-5fb4e70c3b25',
        assetType: 'domain',
        company: 'Individual',
        details: '********.com',
        createdOn: '2022-05-06 11:07:25',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: 'b58fb418-401f-4df1-bdac-7ff30f70b9ec',
        assetType: 'domain',
        company: 'Individual',
        details: '*******************.org',
        createdOn: '2022-05-06 09:24:58',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '8d3e6819-69d9-41ea-bdef-6e83b409a962',
        assetType: 'domain',
        company: 'Individual',
        details: '*********.com',
        createdOn: '2022-05-06 09:01:41',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: '7e243d15-25ec-4414-bda2-d2573ded7577',
        assetType: 'domain',
        company: 'Individual',
        details: '******.com',
        createdOn: '2022-05-06 09:01:27',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: 'e430b7d7-9b9b-454e-9a0d-2c2a599478b5',
        assetType: 'domain',
        company: 'Individual',
        details: '********.com',
        createdOn: '2022-05-06 08:59:14',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: 'c915eca9-14c8-4c71-b4c5-257d8207b711',
        assetType: 'network_ip',
        company: 'Tenerity 1',
        details: '*******.1.0',
        createdOn: '2022-05-06 06:03:20',
        status: 'ACTIVE',
        attributes: {},
      },
      {
        assetId: 'dfec535c-8b8a-40e5-9c2c-d71695ffc27e',
        assetType: 'company_creditsafe_number',
        company: 'Test Company',
        details: '******D123',
        createdOn: '2022-05-05 08:51:30',
        status: 'ACTIVE',
        attributes: {},
      },
    ],
    summary: {
      company_duns_number: {
        maxCount: 1,
        actualCount: 1,
      },
      network_ip: {
        maxCount: 10,
        actualCount: 3,
      },
      domain: {
        maxCount: 10,
        actualCount: 9,
      },
      telephone: {
        maxCount: 10,
        actualCount: 0,
      },
      email: {
        maxCount: 10,
        actualCount: 1,
      },
      company_creditsafe_number: {
        maxCount: 1,
        actualCount: 1,
      },
    },
  },
}

export const testEmployeesData = {
  membershipId: '1c740fd6-6d9e-4ae1-9d42-697142a09b15',
  employees: [
    {
      memberId: '0167b303-f1d7-4b7a-b32d-6f9a6f43ac5d',
      firstName: 'test',
      lastName: 'test',
      createdOn: '2022-10-17T07:10:34.831Z',
      score: 0,
      riskLevel: '',
      status: 'INVITED',
      isPrimary: false,
    },
    {
      memberId: '201241ad-b4a9-45c8-a2c9-709cfdacbf8f',
      firstName: 'john',
      lastName: 'doe',
      createdOn: '2022-10-18T13:22:53.763Z',
      score: 100,
      riskLevel: '',
      status: 'FAILED',
      isPrimary: false,
    },
    {
      memberId: '47d93219-f158-418f-af74-6e797e0a6ad7',
      firstName: 'Revanth',
      lastName: 'Kumar',
      createdOn: '2022-11-03T08:22:03.434Z',
      score: 0,
      riskLevel: '',
      status: '',
      isPrimary: false,
    },
    {
      memberId: '6a9aa817-d40b-4f3e-9f48-228e1af596a0',
      firstName: 'test',
      lastName: 'test',
      createdOn: '2022-10-20T08:52:22.851Z',
      score: 0,
      riskLevel: '',
      status: 'ACTIVE',
      isPrimary: false,
    },
    {
      memberId: '71d6f56b-c8c8-4e0c-a6e8-34e1fc5a6f05',
      firstName: 'Test',
      lastName: 'User',
      createdOn: '2022-07-26T04:51:49.944Z',
      score: 0,
      riskLevel: '',
      status: 'XYZ',
      isPrimary: true,
    },
    {
      memberId: 'b99c7512-dab3-4c9a-b7ef-2f5ca4fe07a3',
      firstName: 'test',
      lastName: 'test',
      createdOn: '2022-11-01T12:28:47.620Z',
      score: 0,
      riskLevel: '',
      status: 'INVITED',
      isPrimary: false,
    },
    {
      memberId: 'c313a738-0787-4840-9527-09d816b606df',
      firstName: 'test',
      lastName: 'test',
      createdOn: '2022-10-19T05:47:30.786Z',
      score: 0,
      riskLevel: 'High',
      status: 'INVITED',
      isPrimary: false,
    },
  ],
  aggregatedScore: {
    totalScore: 0,
    totalScale: 0,
    riskLevel: '',
  },
  summary: {
    max: 10,
    total: 9,
    invited: 7,
    active: 0,
  },
}

const appConfigData = {
  clientId: defaultClient,
  configStoreUrl: 'https://api.#client_env#.affinionservices.com/frontend/v1/configs?client-name=#client_id#&env=#client_env#',
  downloadFromUrl: false,
  env: defaultENV,
  version: '1.0.0',
}

const configStoreData = {
  baseUrl: `https://api.${defaultENV}.affinionservices.com/sme-bff-api/`,
  locales: {
    fallbackLng: 'en',
    lng: 'en',
    supportedLngs: [
      'en',
      'fr',
    ],
  },
  publicKey: 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA0vPKgDZvntueXRv5lNsSyR7qa2m23fdOEMTr3YvpwK2kvSlXWiE9KAy3slXivrMKmZNXNqXu24+GqiEjypC+GhFczoQtyH/a5kF+PxGwslqn4OScf8yPAWi7cHOO7daRmVPXW6MCLTxz5kLIepuswIA4PkEXfGgEAGQK9mZ2YSXzDPbfZLc5oYWyk5R6+EsCKgL90z+f/oVqMdxqSmLvxW5gsV2/NIWLbPtY/dk5I4ypcP4IoEHOruYZxtnLaXDhJYo8O9yI2wU4BsH5g9m0o4JcF5/GM4mx+lvjBXoSHg4VGBg7xGlVyB05dXQNLpvqvXLL34apWP9OqDJhMH5F+wIDAQAB',
}

const regionInfo = {
  supportedRegion: {
    basename: '',
    hostname: `uk-demo-protection.${defaultENV}.affinionservices.com`,
    matcher: 'hostname',
    pathname: '/uk/demo',
  },
  region: `uk-demo-protection.${defaultENV}.affinionservices.com`,
  headers: {
    'x-visibility-scope-key': 'CyberSMEPOC',
    'x-tenant-id': 4000001,
    'x-api-as-key': '0XNp6IdcSPbFg3NBxaAmVGzYsRZWoBit',
  },
  phone: {
    defaultCountryCode: 'uk',
    supportedCountryCodes: [
      {
        code: '+44',
        country: 'uk',
        maxLength: 11,
        minLength: 7,
        name: 'UK',
        regex: '/^[7-9][0-9]{6,10}$/',
      },
      {
        code: '+39',
        country: 'it',
        maxLength: 10,
        minLength: 9,
        name: 'Itlay',
        regex: '/^[7-9][0-9]{8,9}$/',
      },
    ],
  },
  visibilityScopeKey: 'CyberSMEPOC',
  learnMoreContentItems: 4,
  faqCategories: {
    alerts: 5, assets: 5, fraud: 6, passwords: 3, privacy: 5,
  },
  contactDetails: {
    email: 'domain@mail.com',
    phone: '+00 (0) 0000000000',
  },
  timeline: {
    default: {
      duration: 'DAYS_30',
      pageIndex: 1,
      pageSize: 10,
    },
    durationOptions: [
      {
        label: 'settings.timeline.filterOptions.last30Days',
        value: 'DAYS_30',
      },
      {
        label: 'settings.timeline.filterOptions.last3Months',
        value: 'MONTHS_3',
      },
      {
        label: 'settings.timeline.filterOptions.currentYear',
        value: 'YEAR_CURRENT',
      },
      {
        label: 'settings.timeline.filterOptions.lastYear1',
        value: 'YEAR_LAST1',
      },
      {
        label: 'settings.timeline.filterOptions.lastYear2',
        value: 'YEAR_LAST2',
      },
    ],
  },
  meta: {
    property: {
      'og:site_name': 'Protection',
      'og:title': 'Protection (Enterprise App)',
      'og:url': '@region@',
      'og:type': 'website',
      'og:description': 'Help protect what matters most.',
      'og:image': '@region@/resources/images/svg/logo.svg',
      'og:image:alt': 'Protection',
    },
    name: {
      'twitter:image:alt': 'Protection',
    },
  },
  isMaintenance: false,
}

const testData = {
  successData: {
    appConfigData: { ...appConfigData },
    configStoreData: {
      ...configStoreData,
      ...regionInfo,
    },
  },
  buildConfig: {
    data: { ...appConfigData },
  },
  configStore: {
    data: {
      ...configStoreData,
      regions: [
        { ...regionInfo },
      ],
    },
  },
}

export const appConfigMockData = {
  appConfig: {
    ...appConfigReducer.initialState,
    data: { ...testData.successData },
    isLoading: false,
  },
}

export default testData

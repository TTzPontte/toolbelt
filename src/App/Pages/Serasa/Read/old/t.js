const data = {
    partners: [
        {
            id: "4567750f-6edb-4a53-b05b-79c9f2247bbe",
            type: "PJ",
            documentNumber: "62173620000180",
            pipefyId: "66654322",
            status: null,
            filePath: null,
            serasareportID: "f0a0987b-9293-4c92-814c-5eeb21c21e85",
            createdAt: "2023-09-22T21:49:25.288Z",
            updatedAt: "2023-09-22T21:49:25.288Z",
            owner: null,
            _version: 1,
            _lastChangedAt: 1695419365325,
            _deleted: null,
        },
        {
            id: "745be75e-d0aa-42d5-9e35-36f9a6b497ac",
            type: "PJ",
            documentNumber: "22174039000168",
            pipefyId: "66654322",
            status: null,
            filePath: null,
            serasareportID: "f0a0987b-9293-4c92-814c-5eeb21c21e85",
            createdAt: "2023-09-22T21:49:24.780Z",
            updatedAt: "2023-09-22T21:49:24.780Z",
            owner: null,
            _version: 1,
            _lastChangedAt: 1695419364810,
            _deleted: null,
        },
        {
            id: "8641c2ff-7ef9-4f42-b812-e04a9a29ddbf",
            type: "PJ",
            documentNumber: "20198711000120",
            pipefyId: "66654322",
            status: null,
            filePath: null,
            serasareportID: "f0a0987b-9293-4c92-814c-5eeb21c21e85",
            createdAt: "2023-09-22T21:49:25.042Z",
            updatedAt: "2023-09-22T21:49:25.042Z",
            owner: null,
            _version: 1,
            _lastChangedAt: 1695419365069,
            _deleted: null,
        },
    ],
    partnershipResponse: [
        {
            businessDocument: "22174039000168",
            participationPercentage: 20,
            updateDate: "2021-08-05",
            participationInitialDate: "2021-07-24",
        },
        {
            businessDocument: "20198711000120",
            participationPercentage: 12.5,
            updateDate: "2021-08-05",
            participationInitialDate: "2021-08-05",
        },
        {
            businessDocument: "62173620000180",
            participationPercentage: 50,
            updateDate: "2022-07-01",
            participationInitialDate: "2020-07-01",
        },
    ],
};
const dataPJ = {
    "partnerList": [
        {
            "documentId": "07724736847",
            "name": "KATIA HIROMI SASSAQUI",
            "participationPercentage": 33.4,
            "inconsistent": false,
            "hasNegative": false
        },
        {
            "documentId": "15520984867",
            "name": "EDUARDO DIAS",
            "participationPercentage": 33.3,
            "inconsistent": false,
            "hasNegative": true
        },
        {
            "documentId": "27027468883",
            "name": "TONY INACIO DE BARROS",
            "participationPercentage": 33.3,
            "inconsistent": false,
            "hasNegative": true
        }
    ],
    "partners": [
        {
            "id": "c5889a73-25fe-454a-b9fd-0472ef322af2",
            "type": "PJ",
            "documentNumber": "",
            "pipefyId": "66654322",
            "status": null,
            "filePath": null,
            "serasareportID": "6568c645-31f1-4ccd-b371-f11c800cf2c8",
            "createdAt": "2023-09-25T18:38:49.144Z",
            "updatedAt": "2023-09-25T18:38:49.144Z",
            "owner": null,
            "_version": 1,
            "_lastChangedAt": 1695667129171,
            "_deleted": null
        },
        {
            "id": "2ab19e3b-166a-41dd-af32-0684e7df5d42",
            "type": "PJ",
            "documentNumber": "",
            "pipefyId": "66654322",
            "status": null,
            "filePath": null,
            "serasareportID": "6568c645-31f1-4ccd-b371-f11c800cf2c8",
            "createdAt": "2023-09-25T18:38:49.389Z",
            "updatedAt": "2023-09-25T18:38:49.389Z",
            "owner": null,
            "_version": 1,
            "_lastChangedAt": 1695667129414,
            "_deleted": null
        },
        {
            "id": "012db2e3-9e3c-4d1a-ba99-45f27f62598e",
            "type": "PJ",
            "documentNumber": "",
            "pipefyId": "66654322",
            "status": null,
            "filePath": null,
            "serasareportID": "6568c645-31f1-4ccd-b371-f11c800cf2c8",
            "createdAt": "2023-09-25T18:38:49.622Z",
            "updatedAt": "2023-09-25T18:38:49.622Z",
            "owner": null,
            "_version": 1,
            "_lastChangedAt": 1695667129626,
            "_deleted": null
        }
    ]
}
// Create an object to store the combined information
const combinedInfo = {};

// Iterate through the partners
data.partners.forEach((partner) => {
    const documentNumber = partner.documentNumber;

    // Find the corresponding partnership response based on the document number
    const response = data.partnershipResponse.find(
        (r) => r.businessDocument === documentNumber
    );

    if (response) {
        // Combine the information
        combinedInfo[documentNumber] = {
            partner_id: partner.id,
            partner_type: partner.type,
            participation_percentage: response.participationPercentage,
            update_date: response.updateDate,
            participation_initial_date: response.participationInitialDate,
        };
    }
});

// Print the combined information
for (const documentNumber in combinedInfo) {
    console.log(`Document Number: ${documentNumber}`);
    console.log(`Partner ID: ${combinedInfo[documentNumber].partner_id}`);
    console.log(`Partner Type: ${combinedInfo[documentNumber].partner_type}`);
    console.log(
        `Participation Percentage: ${combinedInfo[documentNumber].participation_percentage}%`
    );
    console.log(`Update Date: ${combinedInfo[documentNumber].update_date}`);
    console.log(
        `Participation Initial Date: ${combinedInfo[documentNumber].participation_initial_date}`
    );
    console.log();
}

export const schema = {
    "models": {
        "SerasaReport": {
            "name": "SerasaReport",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "EntityType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "documentNumber": {
                    "name": "documentNumber",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "pipefyId": {
                    "name": "pipefyId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "status": {
                    "name": "status",
                    "isArray": false,
                    "type": {
                        "enum": "ReportStatus"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                },
                "updatedAt": {
                    "name": "updatedAt",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": false,
                    "attributes": [],
                    "isReadOnly": true
                }
            },
            "syncable": true,
            "pluralName": "SerasaReports",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "public",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "EntityType": {
            "name": "EntityType",
            "values": [
                "PJ",
                "PF"
            ]
        },
        "ReportStatus": {
            "name": "ReportStatus",
            "values": [
                "PROCESSING",
                "SUCCESS",
                "ERROR_SERASA",
                "ERROR_PIPEFY"
            ]
        }
    },
    "nonModels": {},
    "codegenVersion": "3.4.4",
    "version": "2a988ca6719ab92626605191998b9acb"
};
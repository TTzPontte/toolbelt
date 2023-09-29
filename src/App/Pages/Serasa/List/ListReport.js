import React, { useEffect, useState } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Collection, Card, Heading, Text, Button, useTheme } from "@aws-amplify/ui-react";
import { SerasaReport } from "../../../../models";
import { useNavigate } from "react-router-dom";

const List = () => {
    const [serasaReports, setSerasaReports] = useState([]);
    const navigate = useNavigate();
    const { tokens } = useTheme();

    const fetchData = async () => {
        try {
            const fetchedModels = await DataStore.query(SerasaReport);
            setSerasaReports(fetchedModels);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await DataStore.delete(SerasaReport, id);
            fetchData(); // Refresh the list
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Collection
            type="list"
            items={serasaReports.map((report) => ({
                title: report.documentNumber,
                badges: [report.type, "Status: " + report.status],
            }))}
            gap="1.5rem"
        >
            {(item, index) => (
                <Card key={index} padding="1rem">
                    <Heading level={4}>{item.title}</Heading>
                    <Text>{item.badges.join(", ")}</Text>
                    <Button variation="danger" onClick={() => handleDelete(serasaReports[index].id)}>
                        Delete
                    </Button>
                    <Button variation="info" onClick={() => navigate(serasaReports[index].id)}>
                        View
                    </Button>
                </Card>
            )}
        </Collection>
    );
};

export default List;

import { DataStore } from "@aws-amplify/datastore";

export default async function getRecordsByMonth(table, date) {
  const results = await DataStore.query(table, record =>
    record.createdAt.contains(date)
  );

  return results;
}

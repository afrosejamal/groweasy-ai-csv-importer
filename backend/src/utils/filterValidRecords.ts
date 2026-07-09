import { CRMRecord } from "../types/crm";

const validStatuses = [
  "GOOD_LEAD_FOLLOW_UP",
  "DID_NOT_CONNECT",
  "BAD_LEAD",
  "SALE_DONE",
];

const validSources = [
  "leads_on_demand",
  "meridian_tower",
  "eden_park",
  "varah_swamy",
  "sarjapur_plots",
];

export function filterValidRecords(records: CRMRecord[]) {
  return records.filter((record) => {
    const hasContact =
      record.email.trim() !== "" ||
      record.mobile_without_country_code.trim() !== "";

    const validStatus =
      record.crm_status === "" ||
      validStatuses.includes(record.crm_status);

    const validSource =
      record.data_source === "" ||
      validSources.includes(record.data_source);

    const validDate =
      record.created_at === "" ||
      !isNaN(new Date(record.created_at).getTime());

    return (
      hasContact &&
      validStatus &&
      validSource &&
      validDate
    );
  });
}
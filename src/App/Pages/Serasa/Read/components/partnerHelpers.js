// Fetch report for a given partner
import {invokeLambda} from "../helpers";

export const fetchAndGenerateReport = async (partner, startLoading, stopLoading) => {
    startLoading();
    try {
        const { Payload } = await invokeLambda(
            "toolbelt3-CreateToolbeltPartnerReport-TpyYkJZlmEPi",
            partner
        );
        const { response } = JSON.parse(Payload);
        const {
            optionalFeatures: {
                partner: { PartnerResponse = { results: [] }, partnershipResponse = [] },
            },
        } = response;

        console.log({ response });
        return { response, PartnerResponse, partnershipResponse };
    } catch (error) {
        console.error("Error:", error);
        return { error };
    } finally {
        stopLoading();
    }
};

// Merge partner data with partner list
export const mergePartner = (partner, partnerList) => {
    const documentKey =
        partner.documentNumber.length > 11 ? "businessDocument" : "documentId";
    const matchedPartner = partnerList.find(
        (p) => p[documentKey] === partner.documentNumber
    );

    return matchedPartner
        ? {
            ...partner,
            participationPercentage: matchedPartner.participationPercentage,
        }
        : partner;
};

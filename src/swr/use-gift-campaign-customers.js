import { decorate } from "@/decorators";
import useCustomSWR from "@/swr/use-custom-swr";

export function useMyAvailable(isReady = false, params = {}) {
  const swr = useCustomSWR(
    isReady,
    "/api/v1/liff/gift_campaign_customers/my_available",
    true,
    null,
    params,
  );
  const data = swr.data?.gift_campaign_customers
    ? decorate(swr.data?.gift_campaign_customers, "giftCampaignCustomer")
    : [];

  return {
    ...swr,
    data,
  };
}

export function useMyGifts(isReady = false, params = {}) {
  const swr = useCustomSWR(
    isReady,
    "/api/v1/liff/gift_campaign_customers/my_gifts",
    true,
    null,
    params,
  );
  const data = swr.data?.gift_campaign_customers
    ? decorate(swr.data?.gift_campaign_customers, "giftCampaignCustomer")
    : [];

  return {
    ...swr,
    data,
  };
}

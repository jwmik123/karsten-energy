// components/CookieConsent.tsx
// Google Consent Mode v2 + Cookiebot.
// Order matters: consent default (denied) must run BEFORE GTM/Cookiebot.
import Script from "next/script";

interface CookieConsentProps {
  cbid: string;
}

export default function CookieConsent({ cbid }: CookieConsentProps) {
  return (
    <>
      {/* 1. Consent Mode v2 default — deny everything until the user opts in. */}
      <Script id="consent-default" strategy="beforeInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            functionality_storage: 'denied',
            personalization_storage: 'denied',
            security_storage: 'granted',
            wait_for_update: 500
          });
          gtag('set', 'ads_data_redaction', true);
          gtag('set', 'url_passthrough', true);
        `}
      </Script>

      {/* 2. Cookiebot — auto-blocking + drives the consent update on accept. */}
      <Script
        id="Cookiebot"
        src="https://consent.cookiebot.com/uc.js"
        data-cbid={cbid}
        data-blockingmode="auto"
        type="text/javascript"
        strategy="beforeInteractive"
      />
    </>
  );
}

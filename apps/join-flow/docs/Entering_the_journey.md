# Entry Points into the Join Flow

The join flow application has three main entry points, each creating appropriate session contexts and ensuring correct attribution:

## 1. Default Entry Point: `/join-flow`

**Purpose**: Standard entry point with default/headline affiliate session

**Route**: `/join-flow`

**Behavior**:

- Creates a default affiliate session using `getDefaultAffiliateSession()`
- Accepts an optional `awc` query parameter
- Falls back to a generic error page if session creation fails
- Used for direct traffic and standard marketing campaigns

**Code Location**: `src/app/join-flow/page.tsx`

## 2. Affiliate Entry Point: `/join-flow/a/[code]`

**Purpose**: Entry point for affiliate marketing campaigns

**Route**: `/join-flow/a/{affiliate-code}`

**Behavior**:

- Creates an affiliate session using `createAffiliateSession(code, awc)`
- Accepts an optional `awc` query parameter
- Falls back to default affiliate session if the affiliate code is invalid (TBC on this behaviour)
- Used for affiliate marketing campaigns and partner referrals

**Code Location**: `src/app/join-flow/referral/affiliates/[code]/page.tsx`

**URL Rewrite**: Configured in `next.config.ts` to redirect `/join-flow/a/:code` to `/join-flow/referral/affiliates/:code`

## 3. Customer Referral Entry Point: `/join-flow/r/[code]` or `/join-flow/refer/[code]`

**Purpose**: Entry point for customer referral campaigns

**Route**: `/join-flow/r/{referral-code}` or `/join-flow/refer/{referral-code}`

**Behavior**:

- Creates a referral session using `createReferralSession(code, awc)`
- Accepts an optional `awc` query parameter
- Attributes sales to customer referrals
- Used for customer referral programs and word-of-mouth marketing

**Code Location**: `src/app/join-flow/referral/customer/[code]/page.tsx`

**URL Rewrites**: Configured in `next.config.ts` to redirect both `/join-flow/r/:code` and `/join-flow/refer/:code` to `/join-flow/referral/customer/:code`

## Common Behavior

All three entry points:

- Render the `ChooseYourAddress` component once the session is established
- Support the optional `awc` query parameter for additional tracking

## Session Creation Flow

1. **Default**: `getDefaultAffiliateSession(awc)` → Default affiliate session
2. **Affiliate**: `createAffiliateSession(code, awc)` → Affiliate session (with fallback to default)
3. **Referral**: `createReferralSession(code, awc)` → Referral session

## Error Handling

- Invalid affiliate codes fall back to default affiliate session
- Failed session creation shows error pages (currently TODO items)
- Loading states are handled consistently across all entry points

## Other information

- To check config of affiliates or referrals, check relevant collections in Squid

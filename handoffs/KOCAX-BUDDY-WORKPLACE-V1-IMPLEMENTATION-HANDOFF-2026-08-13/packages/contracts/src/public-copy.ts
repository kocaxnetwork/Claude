const forbiddenPublicTerms = [/\bmate\b/i, /\bjarvis\b/i, /buddyfather/i, /kiramate/i];

export function assertCustomerFacingCopy(copy: string): void {
  const hit = forbiddenPublicTerms.find((pattern) => pattern.test(copy));
  if (hit) throw new Error(`INTERNAL_IDENTITY_LEAK:${hit.source}`);
}

export const buddyAiSecurityDisclosure =
  "Buddy AI processes authorized content to answer, so a Buddy AI conversation is not end-to-end encrypted against KocaX. Transport and storage claims require environment-specific evidence.";

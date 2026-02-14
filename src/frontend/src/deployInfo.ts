/**
 * Deployment metadata for the live application.
 * Reads canister IDs and deployment URL from build-time environment variables.
 */

interface DeploymentInfo {
  siteUrl: string;
  backendCanisterId: string;
  frontendCanisterId: string;
  network: string;
}

function getDeploymentInfo(): DeploymentInfo {
  // Read from Vite environment variables
  const backendCanisterId = import.meta.env.VITE_BACKEND_CANISTER_ID || 'local-backend';
  const frontendCanisterId = import.meta.env.VITE_FRONTEND_CANISTER_ID || 'local-frontend';
  const network = import.meta.env.VITE_DFX_NETWORK || 'local';
  
  // Determine site URL based on network
  let siteUrl: string;
  
  if (network === 'ic') {
    // Production IC network - use the frontend canister URL
    siteUrl = `https://${frontendCanisterId}.icp0.io`;
  } else if (typeof window !== 'undefined') {
    // Use current window location for local/dev
    siteUrl = window.location.origin;
  } else {
    // Fallback
    siteUrl = 'http://localhost:3000';
  }
  
  return {
    siteUrl,
    backendCanisterId,
    frontendCanisterId,
    network,
  };
}

export const deploymentInfo = getDeploymentInfo();

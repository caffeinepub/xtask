/**
 * Deployment metadata for the live application.
 * Reads canister IDs and deployment URL from build-time environment variables.
 * 
 * For IC mainnet builds, all required environment variables must be set at build time.
 * Missing or placeholder values will cause a configuration error.
 */

interface DeploymentInfo {
  siteUrl: string;
  backendCanisterId: string;
  frontendCanisterId: string;
  network: string;
  isConfigured: boolean;
}

function getDeploymentInfo(): DeploymentInfo {
  // Read from Vite environment variables
  const backendCanisterId = import.meta.env.VITE_BACKEND_CANISTER_ID || '';
  const frontendCanisterId = import.meta.env.VITE_FRONTEND_CANISTER_ID || '';
  const network = import.meta.env.VITE_DFX_NETWORK || 'local';
  
  // Validate IC production builds have required configuration
  const isICBuild = network === 'ic';
  
  // Comprehensive validation for IC builds - reject any placeholder or invalid values
  const isValidCanisterId = (id: string): boolean => {
    if (!id || id.trim() === '') return false;
    if (id === 'MISSING') return false;
    if (id.startsWith('local-')) return false;
    if (id.includes('undefined')) return false;
    if (id.includes('PLACEHOLDER')) return false;
    if (id.includes('CONFIGURATION_ERROR')) return false;
    // Canister IDs should be alphanumeric with dashes
    if (!/^[a-z0-9-]+$/i.test(id)) return false;
    return true;
  };
  
  const hasValidCanisterIds = 
    isValidCanisterId(backendCanisterId) && 
    isValidCanisterId(frontendCanisterId);
  
  // For IC builds, fail fast if configuration is missing
  if (isICBuild && !hasValidCanisterIds) {
    console.error('❌ IC Production Build Configuration Error:');
    console.error('Missing required environment variables for IC deployment.');
    console.error('Required at build time:');
    console.error('  - VITE_DFX_NETWORK=ic');
    console.error('  - VITE_BACKEND_CANISTER_ID=<backend-canister-id>');
    console.error('  - VITE_FRONTEND_CANISTER_ID=<frontend-canister-id>');
    console.error('Current values:');
    console.error(`  - VITE_DFX_NETWORK=${network}`);
    console.error(`  - VITE_BACKEND_CANISTER_ID=${backendCanisterId || '(empty)'}`);
    console.error(`  - VITE_FRONTEND_CANISTER_ID=${frontendCanisterId || '(empty)'}`);
    
    // Return unconfigured state for UI to display error
    return {
      siteUrl: 'CONFIGURATION_ERROR',
      backendCanisterId: backendCanisterId || 'MISSING',
      frontendCanisterId: frontendCanisterId || 'MISSING',
      network,
      isConfigured: false,
    };
  }
  
  // Determine site URL based on network
  let siteUrl: string;
  
  if (isICBuild && hasValidCanisterIds) {
    // Production IC network - use the frontend canister URL
    siteUrl = `https://${frontendCanisterId}.icp0.io`;
  } else if (typeof window !== 'undefined') {
    // Use current window location for local/dev
    siteUrl = window.location.origin;
  } else {
    // Fallback for local development
    siteUrl = 'http://localhost:3000';
  }
  
  return {
    siteUrl,
    backendCanisterId: backendCanisterId || 'local-backend',
    frontendCanisterId: frontendCanisterId || 'local-frontend',
    network,
    isConfigured: !isICBuild || hasValidCanisterIds,
  };
}

export const deploymentInfo = getDeploymentInfo();

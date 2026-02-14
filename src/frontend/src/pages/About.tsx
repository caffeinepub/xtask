import GlassCard from '../components/GlassCard';
import { Info, CheckCircle, XCircle, Globe, Server } from 'lucide-react';
import { deploymentInfo } from '../deployInfo';

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-white">About Xtask</h1>
        <p className="text-gray-300">Platform information and scope</p>
      </div>

      <GlassCard className="space-y-6">
        <div className="flex items-start space-x-3">
          <Info className="h-6 w-6 text-red-500 mt-1" />
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white">Internet Computer Platform</h2>
            <p className="text-gray-300">
              Xtask is built on the Internet Computer blockchain, providing a secure and decentralized platform for
              task completion and earnings.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <Globe className="mr-2 h-5 w-5 text-red-500" />
            Deployment Information
          </h3>
          <div className="space-y-3 ml-7">
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Live Site URL</p>
              <a
                href={deploymentInfo.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-red-400 hover:text-red-300 transition-colors break-all"
              >
                {deploymentInfo.siteUrl}
              </a>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Network</p>
              <p className="text-gray-300 font-mono text-sm">
                {deploymentInfo.network === 'ic' ? 'Internet Computer (Mainnet)' : deploymentInfo.network}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Backend Canister ID</p>
              <p className="text-gray-300 font-mono text-sm break-all">{deploymentInfo.backendCanisterId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-400">Frontend Canister ID</p>
              <p className="text-gray-300 font-mono text-sm break-all">{deploymentInfo.frontendCanisterId}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
            Supported Features
          </h3>
          <ul className="space-y-2 text-gray-300 ml-7">
            <li>• Internet Identity authentication (secure, privacy-preserving)</li>
            <li>• On-chain data storage (all data persists in the canister)</li>
            <li>• Task browsing and completion</li>
            <li>• Referral system with rewards</li>
            <li>• Earnings tracking</li>
            <li>• Admin panel for task and user management</li>
            <li>• Payout request management with admin approval workflow</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <XCircle className="mr-2 h-5 w-5 text-red-500" />
            Not Supported (Platform Limitations)
          </h3>
          <ul className="space-y-2 text-gray-300 ml-7">
            <li>• Email/password authentication (use Internet Identity instead)</li>
            <li>• Google/Apple OAuth login</li>
            <li>• External payment processing (PayPal Payouts API, Stripe, etc.)</li>
            <li>• Real-time WebSocket updates (uses polling/refresh instead)</li>
            <li>• Email notifications</li>
            <li>• Native mobile apps (web-only)</li>
          </ul>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Admin Configuration</h3>
          <p className="text-gray-300">
            Admin access is controlled by Principal allowlisting in the backend canister. To configure admin access,
            you need to set the admin Principal in the canister initialization. See the project README for deployment
            instructions.
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white">Payout Configuration</h3>
          <p className="text-gray-300">
            Payout requests are managed through the admin panel. Admins can approve or decline withdrawal requests.
            When approved, the payout is processed according to the user's selected payment method. Declined requests
            refund the reserved balance back to the user's account.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

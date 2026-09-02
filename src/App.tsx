import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DeleteAccount from './pages/DeleteAccount';
import FeaturePage from './pages/FeaturePage';
import ComparisonPage from './pages/ComparisonPage';
import GuidePage from './pages/GuidePage';
import GuidesIndex from './pages/GuidesIndex';
import FaqPage from './pages/FaqPage';
import PressPage from './pages/PressPage';
import WhatsNew from './pages/WhatsNew';
import AboutPage from './pages/AboutPage';
import StartPage from './pages/StartPage';
import PromoPage from './pages/PromoPage';
import FeatureArena from './pages/FeatureArena';
import AdminPage from './pages/AdminPage';
import PromoAdmin from './pages/PromoAdmin';
import NotFound from './pages/NotFound';
import SiteToast from './components/SiteToast';
import { FEATURE_PAGES } from './content/features';
import { COMPARISON_PAGES } from './content/comparisons';
import { GUIDES } from './content/guides';

/** These pages carry their own call to action; a toast on top would be noise. */
const TOAST_EXCLUDED = ['/plus-free', '/feature-arena', '/admin', '/promo-admin'];

function route(normalized: string) {
  if (normalized === '/') return <Home />;
  if (normalized === '/start') return <StartPage />;
  if (normalized === '/plus-free') return <PromoPage />;
  if (normalized === '/feature-arena') return <FeatureArena />;
  if (normalized === '/admin') return <AdminPage />;
  if (normalized === '/promo-admin') return <PromoAdmin />;
  if (normalized === '/privacypolicy' || normalized === '/privacy') return <PrivacyPolicy />;
  if (normalized === '/delete-account') return <DeleteAccount />;
  if (normalized === '/guides') return <GuidesIndex />;
  if (normalized === '/faq') return <FaqPage />;
  if (normalized === '/press') return <PressPage />;
  if (normalized === '/whats-new') return <WhatsNew />;
  if (normalized === '/about' || normalized === '/vision') return <AboutPage />;

  const feature = FEATURE_PAGES.find((page) => page.path === normalized);
  if (feature) return <FeaturePage content={feature} />;

  const comparison = COMPARISON_PAGES.find((page) => page.path === normalized);
  if (comparison) return <ComparisonPage content={comparison} />;

  const guide = GUIDES.find((page) => page.path === normalized);
  if (guide) return <GuidePage content={guide} />;

  return <NotFound />;
}

function App({ path }: { path: string }) {
  const normalized = path.replace(/\/+$/, '') || '/';

  return (
    <>
      {route(normalized)}
      {!TOAST_EXCLUDED.includes(normalized) && <SiteToast path={normalized} />}
    </>
  );
}

export default App;

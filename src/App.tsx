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
import NotFound from './pages/NotFound';
import { FEATURE_PAGES } from './content/features';
import { COMPARISON_PAGES } from './content/comparisons';
import { GUIDES } from './content/guides';

function App({ path }: { path: string }) {
  const normalized = path.replace(/\/+$/, '') || '/';

  if (normalized === '/') return <Home />;
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

export default App;

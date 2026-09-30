import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

import Home from './pages/Home';
import About from './pages/about/About';
import OurStory from './pages/about/OurStory';
import MissionVisionValues from './pages/about/MissionVisionValues';
import Leadership from './pages/about/Leadership';
import GlobalPresence from './pages/about/GlobalPresence';
import Brands from './pages/Brands';
import Science from './pages/science/Science';
import Research from './pages/science/Research';
import AdvisoryBoard from './pages/science/AdvisoryBoard';
import Quality from './pages/science/Quality';
import Certifications from './pages/science/Certifications';
import Newsroom from './pages/news/Newsroom';
import PressRelease from './pages/news/PressRelease';
import MediaKit from './pages/news/MediaKit';
import Knowledge from './pages/knowledge/Knowledge';
import KnowledgeArticle from './pages/knowledge/KnowledgeArticle';
import Partners from './pages/Partners';
import Careers from './pages/careers/Careers';
import JobOpening from './pages/careers/JobOpening';
import Contact from './pages/Contact';
import Faq from './pages/Faq';
import ReportConcern from './pages/ReportConcern';
import Sustainability from './pages/Sustainability';
import NotFound from './pages/NotFound';

/* Routes mirror the sitemap CSV (C-01 … C-24). */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />
        <Route path="/about/our-story" element={<OurStory />} />
        <Route path="/about/mission-vision-values" element={<MissionVisionValues />} />
        <Route path="/about/leadership" element={<Leadership />} />
        <Route path="/about/global-presence" element={<GlobalPresence />} />

        <Route path="/brands" element={<Brands />} />

        <Route path="/science" element={<Science />} />
        <Route path="/science/research" element={<Research />} />
        <Route path="/science/advisory-board" element={<AdvisoryBoard />} />
        <Route path="/science/quality" element={<Quality />} />
        <Route path="/science/certifications" element={<Certifications />} />

        <Route path="/news" element={<Newsroom />} />
        <Route path="/news/media-kit" element={<MediaKit />} />
        <Route path="/news/:slug" element={<PressRelease />} />

        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/knowledge/:slug" element={<KnowledgeArticle />} />

        <Route path="/partners" element={<Partners />} />

        <Route path="/careers" element={<Careers />} />
        <Route path="/careers/:role" element={<JobOpening />} />

        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/report-concern" element={<ReportConcern />} />
        <Route path="/sustainability" element={<Sustainability />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

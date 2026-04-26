import { useEffect, useState } from 'react';
import metaService from '../services/meta.service';

import GitHubLogo from '../assets/github-mark.svg';


const Footer = (props: any) => {
  const [version, setVersion] = useState<String>("");

  useEffect(() => {
    metaService.getVersion().then(data => {
      if (data) {
        setVersion(data.version);
      }
    });
  }, []);

  return (
    <div className="footer flex justify-between items-center p-4">
      <span>Refractometer Simulation. Version {version}</span>
      <a href="https://github.com/hs-duesseldorf/refractometer2" target='_blank'>
        <img src={GitHubLogo} alt="GitHub Logo" className="w-6 h-6" />
      </a>
    </div>
  );
};

export default Footer;
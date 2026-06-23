import { questions } from './questions';

interface UploadedFile {
  name: string;
  url: string;
}

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  googleBusiness?: string;
}

type FormData = Record<string, string | UploadedFile[] | SocialLinks | undefined>;

const getLabel = (id: string): string =>
  questions.find((q) => q.id === id)?.label.replace(/\?$/, '').trim() ?? id;

const fileGroups = [
  { name: 'Logo Files', id: 'logoFiles' },
  { name: 'Brand Assets', id: 'brandAssets' },
  { name: 'Photos & Images', id: 'photos' },
];

const sectionGroups = [
  {
    name: 'Contact Information',
    ids: ['fullName', 'email', 'phone', 'businessName', 'currentWebsite'],
  },
  {
    name: 'Business Details',
    ids: ['industry', 'businessDescription', 'primaryGoal', 'targetAudience', 'services', 'launchTimeline'],
  },
  {
    name: 'Design Preferences',
    ids: ['visualStyle', 'brandPersonality', 'inspirationSites', 'colors', 'mustHavePages', 'socialLinks'],
  },
  {
    name: 'Special Requests',
    ids: ['specialRequests'],
  },
];

function renderRows(ids: string[], formData: FormData): string {
  return ids
    .map((id) => {
      const value = formData[id];

      let display = '';

      if (id === 'socialLinks') {
        const social = value as SocialLinks | undefined;
        if (social) {
          const links = [
            social.facebook && `<a href="${social.facebook}" style="color:#C2956C;text-decoration:none;">${social.facebook}</a>`,
            social.instagram && `<a href="${social.instagram}" style="color:#C2956C;text-decoration:none;">${social.instagram}</a>`,
            social.googleBusiness && `<a href="${social.googleBusiness}" style="color:#C2956C;text-decoration:none;">${social.googleBusiness}</a>`,
          ].filter(Boolean);
          display = links.length ? links.join('<br>') : '—';
        } else {
          display = '—';
        }
      } else {
        const str = value ? String(value).trim() : '';
        display = str ? str.replace(/\n/g, '<br>') : '—';
      }

      return `
        <tr>
          <td style="padding:12px 16px;background:#f9f7f4;font-size:11px;color:#78716C;font-weight:700;
                     text-transform:uppercase;letter-spacing:0.06em;white-space:nowrap;
                     width:170px;vertical-align:top;border-bottom:1px solid #E7E0D8;">
            ${getLabel(id)}
          </td>
          <td style="padding:12px 16px;font-size:15px;color:#1C1917;line-height:1.6;
                     border-bottom:1px solid #E7E0D8;">
            ${display}
          </td>
        </tr>`;
    })
    .join('');
}

function renderFilesSection(formData: FormData): string {
  const hasFiles = fileGroups.some((g) => {
    const files = formData[g.id] as UploadedFile[] | undefined;
    return files && files.length > 0;
  });

  if (!hasFiles) return '';

  const groupsHtml = fileGroups
    .map((group) => {
      const files = formData[group.id] as UploadedFile[] | undefined;
      if (!files || !files.length) return '';
      return `
        <div style="margin-bottom:20px;">
          <p style="font-size:13px;font-weight:700;color:#1C1917;margin:0 0 10px;">${group.name}</p>
          <ul style="list-style:none;padding:0;margin:0;">
            ${files
              .map(
                (f) => `
              <li style="margin-bottom:6px;">
                <a href="${f.url}" style="color:#C2956C;text-decoration:none;font-size:14px;">
                  &#128206; ${f.name}
                </a>
              </li>`
              )
              .join('')}
          </ul>
        </div>`;
    })
    .join('');

  return `
    <div style="margin:32px 0;">
      <h2 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;
                 color:#78716C;margin:0 0 14px;padding-bottom:8px;border-bottom:2px solid #C2956C;">
        Uploaded Files
      </h2>
      ${groupsHtml}
    </div>`;
}

export function generateEmailHtml(formData: FormData): string {
  const businessName = (formData.businessName as string) || 'New Client';
  const clientName = (formData.fullName as string) || 'Unknown';
  const clientEmail = (formData.email as string) || '';

  const sectionsHtml = sectionGroups
    .map((section) => {
      const rows = renderRows(section.ids, formData);
      return `
        <div style="margin-bottom:28px;">
          <h2 style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.1em;
                     color:#78716C;margin:0 0 12px;padding-bottom:8px;border-bottom:2px solid #C2956C;">
            ${section.name}
          </h2>
          <table style="width:100%;border-collapse:collapse;border-radius:8px;
                        overflow:hidden;border:1px solid #E7E0D8;">
            ${rows}
          </table>
        </div>`;
    })
    .join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>New Website Project — ${businessName}</title>
</head>
<body style="margin:0;padding:0;background:#F0EBE3;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:680px;margin:40px auto 60px;background:#fff;border-radius:16px;
              overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#C2956C;padding:40px 40px 32px;">
      <p style="margin:0 0 6px;font-size:11px;text-transform:uppercase;letter-spacing:0.18em;
                color:rgba(255,255,255,0.65);">New Project Submission</p>
      <h1 style="margin:0;font-size:30px;color:#fff;font-weight:700;line-height:1.2;">
        ${businessName}
      </h1>
      <p style="margin:10px 0 0;color:rgba(255,255,255,0.82);font-size:15px;">
        Submitted by ${clientName}
        &nbsp;&bull;&nbsp;
        <a href="mailto:${clientEmail}" style="color:rgba(255,255,255,0.9);text-decoration:none;">
          ${clientEmail}
        </a>
      </p>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      ${sectionsHtml}
      ${renderFilesSection(formData)}
    </div>

    <!-- Footer -->
    <div style="padding:20px 40px;background:#FAF8F5;border-top:1px solid #E7E0D8;">
      <p style="margin:0;font-size:13px;color:#78716C;text-align:center;">
        Reply directly to this email to respond to ${clientName}.
      </p>
    </div>
  </div>
</body>
</html>`;
}

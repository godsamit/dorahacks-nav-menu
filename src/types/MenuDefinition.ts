interface BaseMenuItem {
  label: string;
  icon?: string;
  description?: string;
}

interface LinkMenuItem extends BaseMenuItem {
  href: string;
}

interface ParentMenuItem extends BaseMenuItem {
  subMenu: MenuItemType[];
}

export type MenuItemType = LinkMenuItem | ParentMenuItem; 

export const MenuContent: MenuItemType[] = [
  {
    label: "Log In",
    href: "/",
  }, {
    label: "BUIDLs", 
    subMenu: [
      {
        label: "All BUIDLs",
        href: "/",
        description: "View All BUIDLs" 
      }, {
        label: "BUIDL Collections",
        href: "/",
        description: "View Specially Curated BUIDLs"
      }
    ]
  }, {
    label: "Grants",
    subMenu: [
      {
        label: "Quadratic Funding",
        href: "/",
        description: "Support multi-chain innovation and participate in quadratic funding rounds."
      }, {
        label: "Mini Grant",
        href: "/",
        description: "Support creative but solid ideas from very early-stage hackers teams."
      }, {
        label: "Grant DAOs",
        description: "Long-term funding programs and quadratic funding rounds from major blockchain ecosystems.",
        subMenu: [
          {
            label: "Aptos Grant DAO",
            href: "/",
            description: "Fund Aptos ecosystem: public goods, infrastructures, and applications with community quadratic governance."
          }, {
            label: "Injective Grant DAO",
            href: "/",
            description: "Fund Innovative Defi Protocols with Injective."
          }
        ]
      }, {
        label: "ATOM Economic Zone Quadratic Grant",
        href: "/",
        description: "Build and contribute to public goods and emerging appchains to expand the AEZ and create a prosperous appchain future."
      }
    ]
  }, {
    label: "Bounties",
    subMenu: [
      {
        label: "DAO Bounties",
        href: "/"
      }, {
        label: "Bug Bounties",
        href: "/"
      }, {
        label: "Mini Bounties",
        href: "/"
      }
    ]
  }, {
    label: "Hackathons",
    href: "/",
  }, {
    label: "Ideas",
    href: "/",
  }, {
    label: "Live",
    subMenu: [
      {
        label: "Binance Live",
        href: "https://www.binance.com/en/live/u/24985985"
      }, {
        label: "YouTube",
        href: "https://www.youtube.com/channel/UCApW8piYNP4T10kgenp0Mjg"
      }, {
        label: "Bilibili",
        href: "https://space.bilibili.com/445312136"
      }
    ]
  }
]
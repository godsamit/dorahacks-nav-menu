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
    href: "/login",
  }, {
    label: "BUIDLs", 
    subMenu: [
      {
        label: "All BUIDLs",
        href: "/allBuidls",
        description: "View All BUIDLs" 
      }, {
        label: "BUIDL Collections",
        href: "/buidlCollections",
        description: "View Specially Curated BUIDLs"
      }
    ]
  }, {
    label: "Grants",
    subMenu: [
      {
        label: "Quadratic Funding",
        href: "/quadraticFunding",
        description: "Support multi-chain innovation and participate in quadratic funding rounds."
      }, {
        label: "Mini Grant",
        href: "/miniGrant",
        description: "Support creative but solid ideas from very early-stage hackers teams."
      }, {
        label: "Grant DAOs",
        description: "Long-term funding programs and quadratic funding rounds from major blockchain ecosystems.",
        subMenu: [
          {
            label: "Aptos Grant DAOs",
            href: "/aptosGrantDAO",
            description: "Fund Aptos ecosystems: public goods, infrastructures, and applications with community quadratic governance."
          }, {
            label: "Injective Grant DAOs",
            href: "/injectiveGrantDAO",
            description: "Fund Innovative Defi Protocols with Injective."
          }
        ]
      }, {
        label: "ATOM Economic Zone Quadratic Grant",
        href: "/atomQuadraticGrant",
        description: "Build and contribute to public goods and emerging appchains to expand the AEZ and create a prosperous appchain future."
      }
    ]
  }, {
    label: "Bounties",
    subMenu: [
      {
        label: "DAO Bounties",
        href: "/DAOBounties"
      }, {
        label: "Bug Bounties",
        href: "/bugBounties"
      }, {
        label: "Mini Bounties",
        href: "/miniBounties"
      }
    ]
  }, {
    label: "Hackathons",
    href: "/hackathons",
  }, {
    label: "Ideas",
    href: "/ideas",
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
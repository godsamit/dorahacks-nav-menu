import { ReactElement } from "react";

interface BaseMenuItem {
  label: string;
  Icon?: ReactElement; // Use unplugin auto-imported icon
  description?: string;
}

export interface LinkMenuItem extends BaseMenuItem {
  href: string;
}

export interface ParentMenuItem extends BaseMenuItem {
  subMenu: MenuItemType[];
}

export type MenuItemType = LinkMenuItem | ParentMenuItem; 

export const MenuContent: MenuItemType[] = [
  {
    label: "Log In",
    href: "/login",
    Icon: <IconMdiLoginVariant />
  }, {
    label: "BUIDLs", 
    Icon: <IconMdiBuild />,
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
    Icon: <IconMdiMoney />,
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
            Icon: <IconDoraAptos />,
            description: "Fund Aptos ecosystems: public goods, infrastructures, and applications with community quadratic governance."
          }, {
            label: "Injective Grant DAOs",
            href: "/injectiveGrantDAO",
            Icon: <IconDoraInjective />,
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
    Icon: <IconMdiSkull />,
    subMenu: [
      {
        label: "DAO Bounties",
        href: "/DAOBounties",
        description: "The best way to work for DAOs, coordinate with the community, and get rewarded.",
      }, {
        label: "Bug Bounties",
        href: "/bugBounties",
        description: "View all Bug Bounties.",
      }, {
        label: "Mini Bounties",
        href: "/miniBounties",
        description: "Let's help each other out! Crowdsource solutions and solve challenges to get rewarded."
      }
    ]
  }, {
    label: "Hackathons",
    Icon: <IconMdiCode />,
    href: "/hackathons",
  }, {
    label: "Ideas",
    href: "/ideas",
    Icon: <IconMdiLightbulbOn />
  }, {
    label: "Live",
    Icon: <IconFluentLive24Filled />,
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
import { colorKeys } from '../palette';

// ----------------------------------------------------------------------

/* **********************************************************************
 * 🗳️ Variants
 * **********************************************************************/
const colorVariants = [
    ...colorKeys.common.map((colorKey) => ({
        props: (props) => props.color === colorKey,
        style: ({ theme }) => ({
            color: theme.vars.palette.common[colorKey],
        }),
    })),
];

/* **********************************************************************
 * 🧩 Components
 * **********************************************************************/
const MuiIconButton = {
    // ▼▼▼▼▼▼▼▼ 🎨 STYLE ▼▼▼▼▼▼▼▼
    styleOverrides: {
        root: {
            variants: [...colorVariants],
        },
    },
};

/* **********************************************************************
 * 🚀 Export
 * **********************************************************************/
export const iconButton = {
    MuiIconButton,
};

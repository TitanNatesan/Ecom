// CommonStyles.js - Comprehensive design system for the application
import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Enhanced Color palette
export const Colors = {
    primary: '#1977F3',
    primaryLight: '#4A90E2',
    primaryDark: '#0D47A1',
    secondary: '#FFAC2F',
    secondaryLight: '#FFD54F',
    secondaryDark: '#FF8F00',
    accent: '#FF7272',
    accentLight: '#FF9999',
    accentDark: '#FF4444',
    background: '#FFFFFF',
    backgroundLight: '#F8F9FA',
    backgroundDark: '#E2E4E5',
    surface: '#FAFAFA',
    text: '#2C3E50',
    textLight: '#7F8C8D',
    textDark: '#1A252F',
    textSecondary: '#5D6D7E',
    success: '#27AE60',
    successLight: '#58D68D',
    successDark: '#1E8449',
    error: '#E74C3C',
    errorLight: '#F1948A',
    errorDark: '#C0392B',
    warning: '#F39C12',
    warningLight: '#F8C471',
    warningDark: '#D68910',
    info: '#3498DB',
    infoLight: '#85C1E9',
    infoDark: '#2874A6',
    border: '#BDC3C7',
    borderLight: '#ECF0F1',
    borderDark: '#85929E',
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
    shadow: 'rgba(0, 0, 0, 0.1)',
    shadowDark: 'rgba(0, 0, 0, 0.2)',
    overlay: 'rgba(0, 0, 0, 0.5)',
};

// Enhanced Spacing system
export const Spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
};

// Enhanced Font sizes
export const FontSizes = {
    xs: 10,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 18,
    xxl: 20,
    title: 24,
    heading: 28,
    display: 32,
    hero: 40,
};

// Font weights
export const FontWeights = {
    light: '300',
    normal: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
};

// Enhanced Border radius
export const BorderRadius = {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    xxl: 24,
    xxxl: 32,
    round: 50,
    circle: 999,
};

// Enhanced Shadows
export const Shadows = {
    none: {},
    light: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    medium: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    heavy: {
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    extreme: {
        shadowColor: Colors.shadowDark,
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
};

// Layout constants
export const Layout = {
    screenWidth,
    screenHeight,
    headerHeight: 100,
    bottomNavHeight: 80,
    borderWidth: 1,
    borderWidthThin: 0.5,
    borderWidthThick: 2,
    minTouchTarget: 44,
};

// Animation durations
export const Animations = {
    fast: 150,
    normal: 300,
    slow: 500,
    verySlow: 1000,
};

// Common component styles
export const CommonStyles = StyleSheet.create({
    // Container styles
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },

    marginLeftSm:{
        marginLeft: Spacing.sm,
    },
    safeArea: {
        flex: 1,
        backgroundColor: Colors.primary,
    },

    screenContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingBottom: Layout.bottomNavHeight,
    },

    scrollContainer: {
        flexGrow: 1,
        paddingBottom: Layout.bottomNavHeight,
    },

    // Header styles
    header: {
        backgroundColor: Colors.primary,
        paddingTop: 50,
        paddingBottom: Spacing.md,
        paddingHorizontal: Spacing.md,
        ...Shadows.medium,
    },

    headerTitle: {
        fontSize: FontSizes.heading,
        fontWeight: FontWeights.bold,
        color: Colors.white,
        textAlign: 'center',
        marginBottom: Spacing.sm,
    },

    headerSubtitle: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.normal,
        color: Colors.primaryLight,
        textAlign: 'center',
    },

    // Search bar styles
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.md,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        marginHorizontal: Spacing.md,
        ...Shadows.light,
    },

    searchInput: {
        flex: 1,
        marginLeft: Spacing.sm,
        fontSize: FontSizes.md,
        color: Colors.text,
        fontWeight: FontWeights.normal,
    },

    // Button styles
    primaryButton: {
        backgroundColor: Colors.primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Layout.minTouchTarget,
        ...Shadows.light,
    },

    secondaryButton: {
        backgroundColor: Colors.secondary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Layout.minTouchTarget,
        ...Shadows.light,
    },

    outlineButton: {
        borderWidth: Layout.borderWidth,
        borderColor: Colors.primary,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.transparent,
        minHeight: Layout.minTouchTarget,
    },

    ghostButton: {
        backgroundColor: Colors.transparent,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Layout.minTouchTarget,
    },

    disabledButton: {
        backgroundColor: Colors.borderLight,
        borderRadius: BorderRadius.md,
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: Layout.minTouchTarget,
    },

    buttonText: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.semiBold,
        color: Colors.white,
    },

    outlineButtonText: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.semiBold,
        color: Colors.primary,
    },

    ghostButtonText: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.semiBold,
        color: Colors.primary,
    },

    disabledButtonText: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.semiBold,
        color: Colors.textLight,
    },

    // Input styles
    inputContainer: {
        marginVertical: Spacing.sm,
        marginHorizontal: Spacing.md,
    },

    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: Layout.borderWidthThin,
        borderColor: Colors.border,
        borderRadius: BorderRadius.md,
        backgroundColor: Colors.white,
        paddingHorizontal: Spacing.md,
        paddingVertical: Spacing.sm,
        minHeight: Layout.minTouchTarget,
    },

    inputWrapperFocused: {
        borderColor: Colors.primary,
        borderWidth: Layout.borderWidth,
        ...Shadows.light,
    },

    inputWrapperError: {
        borderColor: Colors.error,
        borderWidth: Layout.borderWidth,
    },

    input: {
        flex: 1,
        fontSize: FontSizes.md,
        color: Colors.text,
        paddingVertical: Spacing.sm,
        fontWeight: FontWeights.normal,
    },

    inputIcon: {
        marginLeft: Spacing.sm,
    },

    inputLabel: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.medium,
        color: Colors.textDark,
        marginBottom: Spacing.xs,
    },

    inputError: {
        fontSize: FontSizes.sm,
        color: Colors.error,
        marginTop: Spacing.xs,
        fontWeight: FontWeights.normal,
    },

    inputHelp: {
        fontSize: FontSizes.sm,
        color: Colors.textLight,
        marginTop: Spacing.xs,
        fontWeight: FontWeights.normal,
    },

    // Card styles
    card: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginHorizontal: Spacing.md,
        marginVertical: Spacing.sm,
        ...Shadows.light,
    },

    cardElevated: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginHorizontal: Spacing.md,
        marginVertical: Spacing.sm,
        ...Shadows.medium,
    },

    cardFlat: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        marginHorizontal: Spacing.md,
        marginVertical: Spacing.sm,
        borderWidth: Layout.borderWidthThin,
        borderColor: Colors.borderLight,
    },

    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.sm,
    },

    cardTitle: {
        fontSize: FontSizes.xl,
        fontWeight: FontWeights.semiBold,
        color: Colors.text,
    },

    cardSubtitle: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.normal,
        color: Colors.textLight,
    },

    cardContent: {
        marginTop: Spacing.sm,
    },

    // Bottom navigation styles
    bottomNavigation: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: Spacing.sm,
        paddingBottom: Spacing.md,
        borderTopWidth: Layout.borderWidthThin,
        borderTopColor: Colors.borderLight,
        ...Shadows.heavy,
        height: Layout.bottomNavHeight,
    },

    navItem: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: Spacing.sm,
        paddingHorizontal: Spacing.md,
        borderRadius: BorderRadius.lg,
        minWidth: 60,
        minHeight: 60,
    },

    navItemActive: {
        backgroundColor: Colors.primary,
        ...Shadows.medium,
    },

    navItemInactive: {
        backgroundColor: Colors.transparent,
    },

    // Text styles
    heading1: {
        fontSize: FontSizes.display,
        fontWeight: FontWeights.bold,
        color: Colors.textDark,
        marginBottom: Spacing.md,
        lineHeight: FontSizes.display * 1.2,
    },

    heading2: {
        fontSize: FontSizes.heading,
        fontWeight: FontWeights.bold,
        color: Colors.textDark,
        marginBottom: Spacing.sm,
        lineHeight: FontSizes.heading * 1.2,
    },

    heading3: {
        fontSize: FontSizes.title,
        fontWeight: FontWeights.semiBold,
        color: Colors.textDark,
        marginBottom: Spacing.sm,
        lineHeight: FontSizes.title * 1.2,
    },

    bodyText: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.normal,
        color: Colors.text,
        lineHeight: FontSizes.md * 1.5,
    },

    bodyTextLarge: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.normal,
        color: Colors.text,
        lineHeight: FontSizes.lg * 1.4,
    },

    bodyTextSmall: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.normal,
        color: Colors.textSecondary,
        lineHeight: FontSizes.sm * 1.4,
    },

    caption: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.normal,
        color: Colors.textLight,
        lineHeight: FontSizes.sm * 1.3,
    },

    // Product styles
    productGrid: {
        paddingHorizontal: Spacing.sm,
        paddingBottom: Spacing.xl,
    },

    productCard: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        margin: Spacing.sm,
        ...Shadows.light,
        width: (screenWidth - 48) / 2,
    },

    productCardLarge: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.md,
        margin: Spacing.sm,
        ...Shadows.light,
        width: screenWidth - 32,
    },

    productImage: {
        width: '100%',
        height: 120,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.sm,
        resizeMode: 'cover',
    },

    productImageLarge: {
        width: '100%',
        height: 200,
        borderRadius: BorderRadius.md,
        marginBottom: Spacing.sm,
        resizeMode: 'cover',
    },

    productName: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.medium,
        color: Colors.text,
        marginBottom: Spacing.xs,
        lineHeight: FontSizes.md * 1.3,
    },

    productPrice: {
        fontSize: FontSizes.lg,
        fontWeight: FontWeights.bold,
        color: Colors.primary,
    },

    productPriceOriginal: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.normal,
        color: Colors.textLight,
        textDecorationLine: 'line-through',
    },

    // Badge styles
    badge: {
        backgroundColor: Colors.error,
        borderRadius: BorderRadius.sm,
        paddingHorizontal: Spacing.xs,
        paddingVertical: 2,
        alignSelf: 'flex-start',
    },

    badgeText: {
        fontSize: FontSizes.xs,
        fontWeight: FontWeights.bold,
        color: Colors.white,
    },

    badgeSuccess: {
        backgroundColor: Colors.success,
    },

    badgeWarning: {
        backgroundColor: Colors.warning,
    },

    badgeInfo: {
        backgroundColor: Colors.info,
    },

    // Error and success states
    errorText: {
        color: Colors.error,
        fontSize: FontSizes.sm,
        textAlign: 'center',
        marginTop: Spacing.sm,
        fontWeight: FontWeights.medium,
    },

    successText: {
        color: Colors.success,
        fontSize: FontSizes.sm,
        textAlign: 'center',
        marginTop: Spacing.sm,
        fontWeight: FontWeights.medium,
    },

    warningText: {
        color: Colors.warning,
        fontSize: FontSizes.sm,
        textAlign: 'center',
        marginTop: Spacing.sm,
        fontWeight: FontWeights.medium,
    },

    infoText: {
        color: Colors.info,
        fontSize: FontSizes.sm,
        textAlign: 'center',
        marginTop: Spacing.sm,
        fontWeight: FontWeights.medium,
    },

    // Loading states
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },

    loadingText: {
        marginTop: Spacing.md,
        fontSize: FontSizes.md,
        color: Colors.textLight,
        fontWeight: FontWeights.normal,
    },

    // Modal styles
    modalOverlay: {
        flex: 1,
        backgroundColor: Colors.overlay,
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.lg,
        padding: Spacing.lg,
        margin: Spacing.lg,
        maxWidth: screenWidth - 64,
        ...Shadows.heavy,
    },

    // List styles
    listContainer: {
        paddingVertical: Spacing.sm,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.md,
        backgroundColor: Colors.white,
        borderBottomWidth: Layout.borderWidthThin,
        borderBottomColor: Colors.borderLight,
    },

    listItemContent: {
        flex: 1,
        marginLeft: Spacing.md,
    },

    listItemTitle: {
        fontSize: FontSizes.md,
        fontWeight: FontWeights.medium,
        color: Colors.text,
        marginBottom: Spacing.xs,
    },

    listItemSubtitle: {
        fontSize: FontSizes.sm,
        fontWeight: FontWeights.normal,
        color: Colors.textLight,
    },

    // Utility classes
    flex1: { flex: 1 },
    flex0: { flex: 0 },
    flexRow: { flexDirection: 'row' },
    flexColumn: { flexDirection: 'column' },
    justifyCenter: { justifyContent: 'center' },
    justifyStart: { justifyContent: 'flex-start' },
    justifyEnd: { justifyContent: 'flex-end' },
    justifyBetween: { justifyContent: 'space-between' },
    justifyAround: { justifyContent: 'space-around' },
    justifyEvenly: { justifyContent: 'space-evenly' },
    alignCenter: { alignItems: 'center' },
    alignStart: { alignItems: 'flex-start' },
    alignEnd: { alignItems: 'flex-end' },
    alignStretch: { alignItems: 'stretch' },
    textCenter: { textAlign: 'center' },
    textLeft: { textAlign: 'left' },
    textRight: { textAlign: 'right' },
    textJustify: { textAlign: 'justify' },

    // Margins
    marginXs: { margin: Spacing.xs },
    marginSm: { margin: Spacing.sm },
    marginMd: { margin: Spacing.md },
    marginLg: { margin: Spacing.lg },
    marginXl: { margin: Spacing.xl },
    marginTopXs: { marginTop: Spacing.xs },
    marginTopSm: { marginTop: Spacing.sm },
    marginTopMd: { marginTop: Spacing.md },
    marginTopLg: { marginTop: Spacing.lg },
    marginTopXl: { marginTop: Spacing.xl },
    marginBottomXs: { marginBottom: Spacing.xs },
    marginBottomSm: { marginBottom: Spacing.sm },
    marginBottomMd: { marginBottom: Spacing.md },
    marginBottomLg: { marginBottom: Spacing.lg },
    marginBottomXl: { marginBottom: Spacing.xl },
    marginHorizontalXs: { marginHorizontal: Spacing.xs },
    marginHorizontalSm: { marginHorizontal: Spacing.sm },
    marginHorizontalMd: { marginHorizontal: Spacing.md },
    marginHorizontalLg: { marginHorizontal: Spacing.lg },
    marginHorizontalXl: { marginHorizontal: Spacing.xl },
    marginVerticalXs: { marginVertical: Spacing.xs },
    marginVerticalSm: { marginVertical: Spacing.sm },
    marginVerticalMd: { marginVertical: Spacing.md },
    marginVerticalLg: { marginVertical: Spacing.lg },
    marginVerticalXl: { marginVertical: Spacing.xl },

    // Paddings
    paddingXs: { padding: Spacing.xs },
    paddingSm: { padding: Spacing.sm },
    paddingMd: { padding: Spacing.md },
    paddingLg: { padding: Spacing.lg },
    paddingXl: { padding: Spacing.xl },
    paddingHorizontalXs: { paddingHorizontal: Spacing.xs },
    paddingHorizontalSm: { paddingHorizontal: Spacing.sm },
    paddingHorizontalMd: { paddingHorizontal: Spacing.md },
    paddingHorizontalLg: { paddingHorizontal: Spacing.lg },
    paddingHorizontalXl: { paddingHorizontal: Spacing.xl },
    paddingVerticalXs: { paddingVertical: Spacing.xs },
    paddingVerticalSm: { paddingVertical: Spacing.sm },
    paddingVerticalMd: { paddingVertical: Spacing.md },
    paddingVerticalLg: { paddingVertical: Spacing.lg },
    paddingVerticalXl: { paddingVertical: Spacing.xl },
});

export default CommonStyles;

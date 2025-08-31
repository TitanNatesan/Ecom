// components/Modal.js - Reusable modal component
import React from 'react';
import {
    Modal as RNModal,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    ScrollView
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { CommonStyles, Colors, Spacing, BorderRadius, FontSizes } from '../styles/CommonStyles';
import Button from './Button';

const Modal = ({
    visible,
    onClose,
    title,
    children,
    showCloseButton = true,
    closeOnBackdrop = true,
    scrollable = false,
    size = 'medium', // small, medium, large, fullscreen
    buttons = [],
    animationType = 'slide',
    transparent = true,
    style,
    contentStyle,
    headerStyle,
    footerStyle,
    ...props
}) => {
    const handleBackdropPress = () => {
        if (closeOnBackdrop) {
            onClose();
        }
    };

    const getModalSize = () => {
        switch (size) {
            case 'small':
                return {
                    width: '80%',
                    maxHeight: '40%',
                };
            case 'large':
                return {
                    width: '95%',
                    maxHeight: '80%',
                };
            case 'fullscreen':
                return {
                    width: '100%',
                    height: '100%',
                    margin: 0,
                    borderRadius: 0,
                };
            default: // medium
                return {
                    width: '90%',
                    maxHeight: '60%',
                };
        }
    };

    const modalContent = (
        <View style={[CommonStyles.modalContent, getModalSize(), contentStyle]}>
            {/* Header */}
            {(title || showCloseButton) && (
                <View style={[styles.header, headerStyle]}>
                    {title && (
                        <Text style={styles.title}>{title}</Text>
                    )}
                    {showCloseButton && (
                        <TouchableOpacity
                            onPress={onClose}
                            style={styles.closeButton}
                        >
                            <FontAwesome name="times" size={20} color={Colors.textLight} />
                        </TouchableOpacity>
                    )}
                </View>
            )}

            {/* Content */}
            <View style={styles.content}>
                {scrollable ? (
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        {children}
                    </ScrollView>
                ) : (
                    children
                )}
            </View>

            {/* Footer with buttons */}
            {buttons.length > 0 && (
                <View style={[styles.footer, footerStyle]}>
                    {buttons.map((button, index) => (
                        <Button
                            key={index}
                            title={button.title}
                            onPress={button.onPress}
                            variant={button.variant || 'primary'}
                            size={button.size || 'medium'}
                            style={[
                                styles.footerButton,
                                index > 0 && styles.footerButtonSpacing,
                                button.style
                            ]}
                            disabled={button.disabled}
                            loading={button.loading}
                        />
                    ))}
                </View>
            )}
        </View>
    );

    return (
        <RNModal
            visible={visible}
            transparent={transparent}
            animationType={animationType}
            onRequestClose={onClose}
            {...props}
        >
            <TouchableWithoutFeedback onPress={handleBackdropPress}>
                <View style={[CommonStyles.modalOverlay, style]}>
                    <TouchableWithoutFeedback>
                        {modalContent}
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </RNModal>
    );
};

const styles = {
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: Spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderLight,
        marginBottom: Spacing.md,
    },
    title: {
        fontSize: FontSizes.xl,
        fontWeight: '600',
        color: Colors.textDark,
        flex: 1,
    },
    closeButton: {
        padding: Spacing.sm,
        marginLeft: Spacing.md,
    },
    content: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: Spacing.md,
        borderTopWidth: 1,
        borderTopColor: Colors.borderLight,
        marginTop: Spacing.md,
    },
    footerButton: {
        minWidth: 100,
    },
    footerButtonSpacing: {
        marginLeft: Spacing.sm,
    },
};

export default Modal;

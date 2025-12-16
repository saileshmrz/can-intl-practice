import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { useForm, Controller } from "react-hook-form";

import { ThemedView } from "@/components/ThemedView";
import { HeaderBar } from "@/components/ui/HeadBar";
import { useTheme } from "@/context/ThemeContext";
import { Colors } from "@/constants/Colors";
import { FormInput } from "@/components/FormInput";
import { FormButton } from "@/components/FormButton";
import { showToast } from "@/utils/toast";

type OrderFormData = {
  name: string;
  email: string;
  product: string;
  quantity: string;
  address: string;
};

export function OrderForm() {
  const { theme } = useTheme();
  const bgColor = theme === "dark" ? Colors.dark.background : Colors.light.background;
  const cardColor = theme === "dark" ? "#1E1E1E" : Colors.light.background;
  const textColor = theme === "dark" ? "#fff" : Colors.light.text;
  const inputBg = theme === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(238, 236, 232, 0.3)";

  const { control, handleSubmit, formState: { errors } } = useForm<OrderFormData>({
    defaultValues: {
      name: "",
      email: "",
      product: "",
      quantity: "",
      address: "",
    },
  });

  const onSubmit = (data: OrderFormData) => {
    console.log(data);
    showToast("success", "Order submitted!");
  };

  return (
    <ThemedView style={{ flex: 1, backgroundColor: bgColor }}>
      <HeaderBar title="Order Form" showBack={true} />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <ScrollView
          contentContainerStyle={[styles.content, { paddingBottom: 100 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={[styles.card, { backgroundColor: cardColor }]}>
 
            <Controller
              control={control}
              name="name"
              rules={{ required: "Full Name is required" }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.name?.message}
                  textColor={textColor}
                  colorScheme={theme}
                  style={[styles.inputField, { backgroundColor: inputBg }]}
                />
              )}
            />

            <Controller
              control={control}
              name="email"
              rules={{
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email address" },
              }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Email"
                  placeholder="Enter your email"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  error={errors.email?.message}
                  textColor={textColor}
                  colorScheme={theme}
                  style={[styles.inputField, { backgroundColor: inputBg }]}
                />
              )}
            />

            <Controller
              control={control}
              name="product"
              rules={{ required: "Product is required" }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Product"
                  placeholder="Enter product name"
                  value={value}
                  onChangeText={onChange}
                  error={errors.product?.message}
                  textColor={textColor}
                  colorScheme={theme}
                  style={[styles.inputField, { backgroundColor: inputBg }]}
                />
              )}
            />

          
            <Controller
              control={control}
              name="quantity"
              rules={{ required: "Quantity is required" }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Quantity"
                  placeholder="Enter quantity"
                  value={value}
                  onChangeText={onChange}
                  keyboardType="numeric"
                  error={errors.quantity?.message}
                  textColor={textColor}
                  colorScheme={theme}
                  style={[styles.inputField, { backgroundColor: inputBg }]}
                />
              )}
            />

  
            <Controller
              control={control}
              name="address"
              rules={{ required: "Delivery Address is required" }}
              render={({ field: { onChange, value } }) => (
                <FormInput
                  label="Delivery Address"
                  placeholder="Enter delivery address"
                  value={value}
                  onChangeText={onChange}
                  multiline
                  error={errors.address?.message}
                  textColor={textColor}
                  colorScheme={theme}
                  style={[styles.inputField, { backgroundColor: inputBg }]}
                />
              )}
            />

      
            <FormButton
              title="Place Order"
              onPress={handleSubmit(onSubmit)}
              colorScheme="light"
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  card: {
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  inputField: {
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === "ios" ? 0.15 : 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(224, 211, 211, 0.4)",
    marginBottom: 15,
  },
});

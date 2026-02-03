<Global.Microsoft.VisualBasic.CompilerServices.DesignerGenerated()> _
Partial Class Transactional_form
    Inherits System.Windows.Forms.Form

    'Form overrides dispose to clean up the component list.
    <System.Diagnostics.DebuggerNonUserCode()> _
    Protected Overrides Sub Dispose(ByVal disposing As Boolean)
        Try
            If disposing AndAlso components IsNot Nothing Then
                components.Dispose()
            End If
        Finally
            MyBase.Dispose(disposing)
        End Try
    End Sub

    'Required by the Windows Form Designer
    Private components As System.ComponentModel.IContainer

    'NOTE: The following procedure is required by the Windows Form Designer
    'It can be modified using the Windows Form Designer.  
    'Do not modify it using the code editor.
    <System.Diagnostics.DebuggerStepThrough()> _
    Private Sub InitializeComponent()
        lblOverAllReceivedMoney = New Label()
        lblOverAllWithdrawnMoney = New Label()
        lblOverAllBalance = New Label()
        txtOverAllBalance = New TextBox()
        txtOverAllReceivedMoney = New TextBox()
        txtOverAllWIthdrawnMoney = New TextBox()
        MenuStrip1 = New MenuStrip()
        DATEToolStripMenuItem = New ToolStripMenuItem()
        RECEIVEDToolStripMenuItem = New ToolStripMenuItem()
        WITHDRAWNToolStripMenuItem = New ToolStripMenuItem()
        BALANCEToolStripMenuItem = New ToolStripMenuItem()
        REMARKSToolStripMenuItem = New ToolStripMenuItem()
        TYPEToolStripMenuItem = New ToolStripMenuItem()
        MenuStrip1.SuspendLayout()
        SuspendLayout()
        ' 
        ' lblOverAllReceivedMoney
        ' 
        lblOverAllReceivedMoney.AutoSize = True
        lblOverAllReceivedMoney.Location = New Point(41, 301)
        lblOverAllReceivedMoney.Name = "lblOverAllReceivedMoney"
        lblOverAllReceivedMoney.Size = New Size(175, 20)
        lblOverAllReceivedMoney.TabIndex = 0
        lblOverAllReceivedMoney.Text = "Over All Received Money"
        ' 
        ' lblOverAllWithdrawnMoney
        ' 
        lblOverAllWithdrawnMoney.AutoSize = True
        lblOverAllWithdrawnMoney.Location = New Point(41, 359)
        lblOverAllWithdrawnMoney.Name = "lblOverAllWithdrawnMoney"
        lblOverAllWithdrawnMoney.Size = New Size(187, 20)
        lblOverAllWithdrawnMoney.TabIndex = 1
        lblOverAllWithdrawnMoney.Text = "Over All Withdrawn Money"
        ' 
        ' lblOverAllBalance
        ' 
        lblOverAllBalance.AutoSize = True
        lblOverAllBalance.Location = New Point(41, 425)
        lblOverAllBalance.Name = "lblOverAllBalance"
        lblOverAllBalance.Size = New Size(118, 20)
        lblOverAllBalance.TabIndex = 2
        lblOverAllBalance.Text = "Over All Balance"
        ' 
        ' txtOverAllBalance
        ' 
        txtOverAllBalance.Location = New Point(222, 422)
        txtOverAllBalance.Name = "txtOverAllBalance"
        txtOverAllBalance.Size = New Size(125, 27)
        txtOverAllBalance.TabIndex = 3
        ' 
        ' txtOverAllReceivedMoney
        ' 
        txtOverAllReceivedMoney.Location = New Point(238, 301)
        txtOverAllReceivedMoney.Name = "txtOverAllReceivedMoney"
        txtOverAllReceivedMoney.Size = New Size(125, 27)
        txtOverAllReceivedMoney.TabIndex = 4
        ' 
        ' txtOverAllWIthdrawnMoney
        ' 
        txtOverAllWIthdrawnMoney.Location = New Point(248, 359)
        txtOverAllWIthdrawnMoney.Name = "txtOverAllWIthdrawnMoney"
        txtOverAllWIthdrawnMoney.Size = New Size(125, 27)
        txtOverAllWIthdrawnMoney.TabIndex = 5
        ' 
        ' MenuStrip1
        ' 
        MenuStrip1.ImageScalingSize = New Size(20, 20)
        MenuStrip1.Items.AddRange(New ToolStripItem() {DATEToolStripMenuItem, RECEIVEDToolStripMenuItem, WITHDRAWNToolStripMenuItem, BALANCEToolStripMenuItem, REMARKSToolStripMenuItem, TYPEToolStripMenuItem})
        MenuStrip1.Location = New Point(0, 0)
        MenuStrip1.Name = "MenuStrip1"
        MenuStrip1.Size = New Size(877, 28)
        MenuStrip1.TabIndex = 6
        MenuStrip1.Text = "MenuStrip1"
        ' 
        ' DATEToolStripMenuItem
        ' 
        DATEToolStripMenuItem.Name = "DATEToolStripMenuItem"
        DATEToolStripMenuItem.Size = New Size(59, 24)
        DATEToolStripMenuItem.Text = "DATE"
        ' 
        ' RECEIVEDToolStripMenuItem
        ' 
        RECEIVEDToolStripMenuItem.Name = "RECEIVEDToolStripMenuItem"
        RECEIVEDToolStripMenuItem.Size = New Size(89, 24)
        RECEIVEDToolStripMenuItem.Text = "RECEIVED"
        ' 
        ' WITHDRAWNToolStripMenuItem
        ' 
        WITHDRAWNToolStripMenuItem.Name = "WITHDRAWNToolStripMenuItem"
        WITHDRAWNToolStripMenuItem.Size = New Size(114, 24)
        WITHDRAWNToolStripMenuItem.Text = "WITHDRAWN"
        ' 
        ' BALANCEToolStripMenuItem
        ' 
        BALANCEToolStripMenuItem.Name = "BALANCEToolStripMenuItem"
        BALANCEToolStripMenuItem.Size = New Size(87, 24)
        BALANCEToolStripMenuItem.Text = "BALANCE"
        ' 
        ' REMARKSToolStripMenuItem
        ' 
        REMARKSToolStripMenuItem.Name = "REMARKSToolStripMenuItem"
        REMARKSToolStripMenuItem.Size = New Size(89, 24)
        REMARKSToolStripMenuItem.Text = "REMARKS"
        ' 
        ' TYPEToolStripMenuItem
        ' 
        TYPEToolStripMenuItem.Name = "TYPEToolStripMenuItem"
        TYPEToolStripMenuItem.Size = New Size(55, 24)
        TYPEToolStripMenuItem.Text = "TYPE"
        ' 
        ' Transactional_form
        ' 
        AutoScaleDimensions = New SizeF(8.0F, 20.0F)
        AutoScaleMode = AutoScaleMode.Font
        ClientSize = New Size(877, 486)
        Controls.Add(txtOverAllWIthdrawnMoney)
        Controls.Add(txtOverAllReceivedMoney)
        Controls.Add(txtOverAllBalance)
        Controls.Add(lblOverAllBalance)
        Controls.Add(lblOverAllWithdrawnMoney)
        Controls.Add(lblOverAllReceivedMoney)
        Controls.Add(MenuStrip1)
        MainMenuStrip = MenuStrip1
        Name = "Transactional_form"
        Text = "Transactional_form"
        MenuStrip1.ResumeLayout(False)
        MenuStrip1.PerformLayout()
        ResumeLayout(False)
        PerformLayout()
    End Sub

    Friend WithEvents lblOverAllReceivedMoney As Label
    Friend WithEvents lblOverAllWithdrawnMoney As Label
    Friend WithEvents lblOverAllBalance As Label
    Friend WithEvents txtOverAllBalance As TextBox
    Friend WithEvents txtOverAllReceivedMoney As TextBox
    Friend WithEvents txtOverAllWIthdrawnMoney As TextBox
    Friend WithEvents MenuStrip1 As MenuStrip
    Friend WithEvents DATEToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents RECEIVEDToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents WITHDRAWNToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents BALANCEToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents REMARKSToolStripMenuItem As ToolStripMenuItem
    Friend WithEvents TYPEToolStripMenuItem As ToolStripMenuItem

    Private Sub btnTotal_Click(sender As Object, e As EventArgs)

    End Sub


    Public Class Form1
        Private Sub Form1_Load(sender As Object, e As EventArgs) Handles MyBase.Load

        End Sub


    End Class


    Public Class Transactional_form

        ' Internal running totals
        Dim totalReceived As Decimal = 0
        Dim totalWithdraw As Decimal = 0

        Private Sub Transactional_form_Load(sender As Object, e As EventArgs) Handles MyBase.Load
            ' Fill combo box
            cboType.Items.Add("Cash In")
            cboType.Items.Add("Cash Out")
            cboType.Items.Add("Bank Transfer")
            cboType.Items.Add("Other")
            cboType.SelectedIndex = 0

            ClearSummary()
        End Sub

        '===============================================
        ' ADD TRANSACTION
        '===============================================
        Private Sub AddTransactionToolStripMenuItem_Click(sender As Object, e As EventArgs) _
                Handles AddTransactionToolStripMenuItem.Click

            Dim r As Decimal = 0
            Dim w As Decimal = 0

            ' Convert values safely
            Decimal.TryParse(txtOverAllReceivedMoney.Text, r)
            Decimal.TryParse(txtOverAllWIthdrawnMoney.Text, w)

            ' Update internal totals
            totalReceived += r
            totalWithdraw += w

            ' Update summary textboxes
            txtOverAllReceivedMoney.Text = totalReceived.ToString("N2")
            txtOverAllWIthdrawnMoney.Text = totalWithdraw.ToString("N2")
            txtOverAllBalance.Text = (totalReceived - totalWithdraw).ToString("N2")

            ' Clear entry fields after adding transaction
            txtOverAllReceivedMoney.Clear()
            txtOverAllWIthdrawnMoney.Clear()
            txtRemarks.Clear()
            cboType.SelectedIndex = 0

            MessageBox.Show("Transaction added successfully!", "Success", MessageBoxButtons.OK)
        End Sub

        '===============================================
        ' CLEAR ALL DATA
        '===============================================
        Private Sub ClearAllToolStripMenuItem_Click(sender As Object, e As EventArgs) _
                Handles ClearAllToolStripMenuItem.Click

            totalReceived = 0
            totalWithdraw = 0
            ClearSummary()

            MessageBox.Show("All data has been cleared.", "Cleared", MessageBoxButtons.OK)
        End Sub

        Private Sub ClearSummary()
            txtOverAllReceivedMoney.Text = "0.00"
            txtOverAllWIthdrawnMoney.Text = "0.00"
            txtOverAllBalance.Text = "0.00"
        End Sub

        '===============================================
        ' EXIT APP
        '===============================================
        Private Sub ExitToolStripMenuItem_Click(sender As Object, e As EventArgs) _
                Handles ExitToolStripMenuItem.Click

            Me.Close()
        End Sub

    End Class   ' 